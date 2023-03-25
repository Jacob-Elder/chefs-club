const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const http = require('http')
const {GraphQLError} = require('graphql')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
//inlude dependencies for web sockets / subscriptions
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')
//include mongoose and all schemas
const mongoose = require("mongoose")
mongoose.set("strictQuery", false)
const User = require("./models/user.js")
const Post = require("./models/post.js")
//import gql typedefs and resolvers
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const { async } = require('regenerator-runtime')
require('dotenv').config()
const DataLoader = require('dataloader')
//use mongoose to connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI).then(() => {
  console.log("connected to mongodb")
}).catch((error) => {
  console.log("error occured trying to connect to mongodb", error.message)
})

//mongoose.set('debug', true);

//Serving React Frontend (Oldway)
const path = require('path');

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})

async function startServer() {
  await server.start();

  //Serving React Build
  app.use(express.static(path.join(__dirname, 'build')));

  app.use(
    '/',
    cors(),
    bodyParser.json({ limit: '50mb' }),
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    expressMiddleware(server, {
      context: async ({req, res}) => {
        //data loader to batch user IDs into a single query
        let userLoaderResult = null
    
        const userLoader = new DataLoader(async keys => {
          const users = await User.find({_id : { $in: keys}})
          const userMap = {}
          users.forEach(user => {
            userMap[user._id] = user
          })
          userLoaderResult = keys.map(key => userMap[key])
        })
    
        //check for auth header from client
        const auth = req ? req.headers.authorization : null
    
        let currentUser = null
        if (auth && auth.startsWith('Bearer ')) {
          const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET)
          currentUser = await User.findOne({_id : decodedToken._id})
        }
    
        return {currentUser, userLoaderResult}
      }
    }),
  );

  // Modified server startup
  new Promise((resolve) => httpServer.listen({ port: process.env.PORT || 4000 }, resolve));
  console.log(`🚀 Server running `);
}

startServer();
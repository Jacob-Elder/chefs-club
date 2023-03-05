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
//include mongoose and all schemas
const mongoose = require("mongoose")
mongoose.set("strictQuery", false)
const User = require("./models/user.js")
const Post = require("./models/post.js")
//import gql typedefs and resolvers
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
require('dotenv').config()
//use mongoose to connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI).then(() => {
  console.log("connected to mongodb")
}).catch((error) => {
  console.log("error occured trying to connect to mongodb", error.message)
})


const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const server = new ApolloServer({
    schema: makeExecutableSchema({typeDefs, resolvers}),
    plugins: [ApolloServerPluginDrainHttpServer({httpServer})]
  })

  await server.start()

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({req}) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
          const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET)
          const currentUser = await User.findOne({_id : decodedToken._id})
          return { currentUser }
        }
      }
    })
  )

  const PORT = 4000

  httpServer.listen(PORT, () => {
    console.log(`Server is now running on port: ${PORT}`)
  })

}

start()


//start server and set context to allow for authorization header in requests
//context is given to all resolvers as their 3rd parameter
//context is the place to perform logic that is shared by multiple resolvers (such as authentication)
// startStandaloneServer(server, {
//   listen: { port: 4000 },
//   context: async ({req, res}) => {
//     const auth = req ? req.headers.authorization : null
//     if (auth && auth.startsWith('Bearer ')) {
//       const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET)
//       const currentUser = await User.findOne({_id : decodedToken._id})
//       return { currentUser }
//     }
//   }
// }).then(({ url }) => {
//   console.log(`Server ready at ${url}`)
// })
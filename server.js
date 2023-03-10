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


// const start = async () => {
//   const app = express()
//   const httpServer = http.createServer(app)

//   const wsServer = new WebSocketServer({
//     server: httpServer,
//     path: "/"
//   })

//   const schema = makeExecutableSchema({ typeDefs, resolvers })
//   const serverCleanup = useServer({ schema }, wsServer)

//   const server = new ApolloServer({
//     schema,
//     plugins: [
//       ApolloServerPluginDrainHttpServer({ httpServer }),
//       {
//         async serverWillStart() {
//           return {
//             async drainServer() {
//               await serverCleanup.dispose();
//             },
//           };
//         },
//       },
//     ],
//   })

//   await server.start()

//   app.use(
//     '/',
//     cors(),
//     express.json(),
//     expressMiddleware(server, {
//       context: async ({req}) => {
//         //data loader to batch user IDs into a single query
//         const userLoader = new DataLoader(async keys => {
//           const users = await User.find({_id : { $in: keys}})
//           const userMap = {}
//           users.forEach(user => {
//             userMap[user._id] = user
//           })
//           console.log("keys: ", keys)
//           const userLoaderResult = keys.map(key => userMap[key])
//           console.log("user Loader result: ", userLoaderResult)
//           return userLoaderResult
//         })
//         //get auth header and find current user data
//         const auth = req ? req.headers.authorization : null
//         if (auth && auth.startsWith('Bearer ')) {
//           const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET)
//           const currentUser = await User.findOne({_id : decodedToken._id})
//           return { currentUser, userLoader }
//         }
//       }
//     })
//   )

//   const PORT = 4000

//   httpServer.listen(PORT, () => {
//     console.log(`Server is now running on port: ${PORT}`)
//   })

// }

//start()

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

// start server and set context to allow for authorization header in requests
// context is given to all resolvers as their 3rd parameter
// context is the place to perform logic that is shared by multiple resolvers (such as authentication)
startStandaloneServer(server, {
  listen: { port: 4000 },
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
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
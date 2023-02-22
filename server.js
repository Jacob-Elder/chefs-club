const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const {GraphQLError} = require('graphql')
//include mongoose and all schemas
const mongoose = require("mongoose")
const ObjectId = mongoose.ObjectId;
mongoose.set("strictQuery", false)
const User = require("./models/user.js")
const Post = require("./models/post.js")
require('dotenv').config()
//use mongoose to connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI).then(() => {
  console.log("connected to mongodb")
}).catch((error) => {
  console.log("error occured trying to connect to mongodb", error.message)
})


const typeDefs = `

    type Post {
        _id: ID!
        title: String!
        ingredients: [String!]
        steps: [String!]
        tags: [String!]
        date: String!
    }

    type Query {
        allPosts: [Post!]
    }
`

const resolvers = {
  Query: {
    allPosts: (root, args) => {
      //get all posts from MongoDB
      return Post.find()
        .then(posts => {
          return posts
        })
        .catch(err => {
          console.log("error getting posts from MongoDB")
          throw err;
        })
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
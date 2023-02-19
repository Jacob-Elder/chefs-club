const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const {GraphQLError} = require('graphql')
const DB = require("./db.json")

let users = DB.users
let posts = DB.posts

const typeDefs = `

    type Post {
        id: String!
        userId: String!
        title: String!
        ingredients: [String!]!
        steps: [String!]!
        tags: [String!]!
    }

    type User {
        id: String!
        email: String!
        username: String!
        password: String!
        userPosts: [String!]!
    }

    type Query {
        allPosts: [Post!]!
        findPostById(id: String!): Post
        findUserById(id: String!): User
    }
`

const resolvers = {
  Query: {
    allPosts: (root, args) => {
      console.log("allPosts request made to server")
      console.log("returning", posts)
      return posts
    },
    findPostById: (root, args) => {
      const post = posts.find(p => p.id.toString() === args.id)
      //throw an error if user does not exist
      if (!post) {
        throw new GraphQLError("Could not find post", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.id
          }
        })
      }
      // return post
      return post
    },
    findUserById: (root, args) => {
      const user = users.find(u => u.id.toString() === args.id)
      //throw an error if user does not exist
      if (!user) {
        throw new GraphQLError("Could not find user", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.id
          }
        })
      }
      // return user
      return user
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
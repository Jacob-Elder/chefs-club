const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
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
    }
`

const resolvers = {
  Query: {
    allPosts: (root, args) => posts
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
  console.log(users)
  console.log(posts)
})
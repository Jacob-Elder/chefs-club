const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const {GraphQLError} = require('graphql')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
//include mongoose and all schemas
const mongoose = require("mongoose")
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
        userId: ID!
        title: String!
        ingredients: [String!]
        steps: [String!]
        tags: [String!]
        date: String!
        likes: Int!
    }

    type User {
      _id: ID!
      email: String!
      username: String!
      password: String!
      userPosts: [ID!]
      likedPosts: [ID!]
    }

    type Token {
      value: String!
    }

    type Query {
        allPosts: [Post!]
        topPosts: [Post!]
        newPosts: [Post!]
        getUserData(_id: ID!) : User
        me: User
    }

    type Mutation {
      addUser(
        email: String!
        username: String!
        password: String!
      ): User
      login(
        email: String!
        password: String!
      ): Token
      addPost(
        title : String!
        ingredients : [String!]!
        steps : [String!]!
        tags : [String!]!
      ) : Post
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
    },
    topPosts: (root, args) => {
      //get top 5 most liked posts
      return Post.find().sort({likes: -1}).limit(5)
        .then(posts => {
          return posts
        })
        .catch(err => {
          console.log("error getting top posts from MongoDB")
          throw err;
        })
    },
    newPosts: (root, args) => {
      //get top 5 newest posts
      return Post.find().sort({date: -1}).limit(5)
        .then(posts => {
          return posts
        })
        .catch(err => {
          console.log("error getting newest posts from MongoDB")
          throw err;
        })
    },
    getUserData: (root, args) => {
      //get user data based on ID
      console.log("trying to find user with ID: ", args._id)
      return User.findOne({_id: args._id})
        .then(result => {
          console.log(result)
          return result
        })
    },
    me: (root, args, context) => {
      console.log("me server route hit. returning: ", context.currentUser)
      return context.currentUser
    }
  },
  Mutation: {
    addUser: async (root, args) => {
      //hash the given password and create new User
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(args.password, saltRounds)
      const newUser = new User({...args, password: passwordHash, userPosts: [], likedPosts: []})
      //save the new user to DB (or throw an error)
      try {
        await newUser.save()
      } catch (error) {
        throw new GraphQLError("Saving New User Failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error
          }
        })
      }
      //return new user to the client
      return newUser
    },
    login: async (root, args) => {
      //find user with the given email
      const user = await User.findOne({email: args.email})
      //compare given password to hash password in DB
      const passwordCorrect = !user ? false : await bcrypt.compare(args.password, user.password)
      //throw an error if email or password is not valid
      if (!(user && passwordCorrect)) {
        throw new GraphQLError("Email or Password is invalid", {
          extensions: {
            code: "BAD_USER_INPUT"
          }
        })
      }
      //create object with needed info for token
      const userForToken = {
        email: user.email,
        username: user.username,
        _id: user._id,
      }
      //create and return the web token
      return {value: jwt.sign(userForToken, process.env.SECRET)}
    },
    addPost: async (root, args, context) => {
      //get the current user
      const currentUser = context.currentUser
      //throw an error if not logged in
      if (!currentUser) {
        throw new GraphQLError("Must be logged in to post", {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      //create a new Post using the args passed from the client
      const newPost = new Post({
        ...args,
        userId: currentUser._id,
        date: Date.now(),
        likes: 0
      })
      //save the new post to DB
      try {
        await newPost.save()
      }
      catch (error) {
        throw new GraphQLError("saving new post failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            error
          }
        })
      }
      //return new post to the client
      return newPost
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

//start server and set context to allow for authorization header in requests
//context is given to all resolvers as their 3rd parameter
//context is the place to perform logic that is shared by multiple resolvers (such as authentication)
startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({req, res}) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET)
      const currentUser = await User.findOne({_id : decodedToken._id})
      return { currentUser }
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
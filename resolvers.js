const {GraphQLError} = require('graphql')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const User = require("./models/user.js")
const Post = require("./models/post.js")
//include depencencies for subscriptions
const { PubSub } = require('graphql-subscriptions')
const { default: mongoose } = require('mongoose')
const pubsub = new PubSub()

const resolvers = {
    //field resolver to get User associated with each post
    Post: {
      user: async (parent) => {
        const user = await User.findOne({_id: parent.user})
        return user
      }
    },
    //query resolvers
    Query: {
      allPosts: (root, args) => {
        //get all posts from MongoDB
        console.log("post.find")
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
      getPost: (root, args) => {
        //get a single post based on ID
        return Post.findOne({_id: args._id})
          .then(result => {
            return result
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
    //mutation resolvers
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
          throw new GraphQLError("Email or Username already taken", {
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
          user: new mongoose.Types.ObjectId(currentUser._id),
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
        //send new post to subscribers
        //pubsub.publish('POST_ADDED', {postAdded: newPost})
        //return new post to the client
        return newPost
      }
    },
    Subscription: {
        //save info about all clients that subscribe to an iterator object called POST_ADDED
        postAdded: {
            subscribe: () => pubsub.asyncIterator('POST_ADDED')
        }
    }
  }

  module.exports = resolvers
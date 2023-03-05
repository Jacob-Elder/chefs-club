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

    type Subscription {
        postAdded: Post!
    }

`

module.exports = typeDefs
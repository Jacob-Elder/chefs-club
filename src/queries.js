import {gql} from '@apollo/client'
import { _immediateFn } from 'promise-polyfill'

export const ALL_POSTS = gql`
query {
  allPosts {
    _id
    userId
    title
    ingredients
    steps
    tags
    date
    likes
  }
}
`
//get 5 most liked and 5 newest posts for the homepage
export const TOP_AND_NEW_POSTS = gql`
query NewPosts {
  newPosts {
    _id
    date
    ingredients
    likes
    steps
    tags
    title
    user {
      _id
      email
      username
      password
      userPosts
      likedPosts
    }
  }
  topPosts {
    _id
    title
    ingredients
    steps
    tags
    date
    likes
    user {
      _id
      email
      username
      password
      userPosts
      likedPosts
    }
  }
}
`

//query to create a new user on signup. Requires email, username, and password
export const CREATE_USER = gql`
mutation addUser($email: String!, $username: String!, $password: String!) {
  addUser(
    email: $email
    username: $username
    password: $password
  ) {
    _id
    email
    username
    userPosts
    likedPosts
  }
}
`

//query to login user that returns a web token
export const LOGIN = gql`
mutation login($email: String!, $password: String!) {
  login(
    email: $email
    password: $password
  ) {
    value
  }
}
`

//mutation to create a new post
export const CREATE_POST = gql`
mutation addPost($title: String!, $ingredients: [String!]!, $steps: [String!]!, $tags: [String!]!) {
  addPost(
    title: $title
    ingredients: $ingredients
    steps: $steps
    tags: $tags
  ) {
    _id
  }
}
`

//query to get a single post by ID
export const GET_POST = gql`
  query getPost($_id: ID!) {
    getPost(_id: $_id) {
      _id
      title
      ingredients
      steps
      tags
      date
      likes
      user {
        _id
        username
      }
    }
  }
`

//query to get a user's profile by ID
export const GET_USER_PROFILE = gql`
  query getUserData($_id: ID!) {
    getUserData(
      _id: $_id
    ) {
      _id
      username
      userPosts
      likedPosts
    }
  }
`

//query to get the current user with web token
export const GET_CURRENT_USER = gql`
query {
  me {
    _id
    username
    email
    userPosts
    likedPosts
  }
}
`

//query to set up a subscription for new posts being added
export const POST_ADDED = gql`
subscription PostAdded {
  postAdded {
    _id
    userId
    title
    ingredients
    steps
    tags
    date
    likes
  }
}
`


// export const FIND_USER_BY_ID = gql`
// query findUserById($id: String!) {
//   findUserById(id: $id) {
//     _id
//     username
//     email
//     userPosts
//   }
// }
// `

// export const FIND_POST_BY_ID = gql`
// query findPostById($id: String!) {
//   findPostById(id: $id) {
//     _id
//     userId
//     title
//     ingredients
//     steps
//     tags
//   }
// }
// `
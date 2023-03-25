import {gql} from '@apollo/client'
import { _immediateFn } from 'promise-polyfill'

export const ALL_POSTS = gql`
query {
  allPosts {
    _id
    user {
      _id
      username
    }
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
      username
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
      username
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
    userPosts {
      _id
      title
    }
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
//query to seach for posts by tag
export const SEARCH_POSTS_BY_TAG = gql`
  query searchPosts($tag: String!) {
    searchPosts(tag: $tag) {
      _id
      title
      likes
      tags
      user {
        _id
        username
      }
    }
  }
`

//mutation to like a post
export const LIKE_POST = gql`
mutation likePost($_id: ID!) {
  likePost(_id: $_id) {
    _id
    title
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
      userPosts {
        _id
        title
        ingredients
        steps
        tags
        likes
        date
      }
      likedPosts
    }
  }
`

//query to get the current user with web token stored in local storage
export const GET_CURRENT_USER = gql`
query {
  me {
    _id
    username
    email
    userPosts {
      _id
      title
      ingredients
      steps
      tags
      likes
      date
    }
    likedPosts
  }
}
`

//query to get current user with web token passed as a parameter
export const GET_CURRENT_USER_BY_TOKEN = gql`
query meByToken($token: String!) {
    meByToken(
      token: $token
    ) {
      _id
    username
    email
    userPosts {
      _id
      title
      ingredients
      steps
      tags
      likes
      date
    }
    likedPosts
    }
  }
`

//query to set up a subscription for new posts being added
export const POST_ADDED = gql`
subscription PostAdded {
  postAdded {
    _id
    user {
      _id
      username
    }
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
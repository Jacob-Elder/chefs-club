import {gql} from '@apollo/client'

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

export const TOP_AND_NEW_POSTS = gql`
query {
  topPosts {
    _id
    userId
    title
    ingredients
    steps
    tags
    date
    likes
  }
  newPosts {
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

//query to create a new user on signup. Requires email, username, and password
export const CREATE_USER = gql`
mutation createUser($email: String!, $username: String!, $password: String!) {
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
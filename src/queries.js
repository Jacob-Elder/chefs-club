import {gql} from '@apollo/client'

export const ALL_POSTS = gql`
query {
  allPosts {
    _id
    title
    ingredients
    steps
    tags
    date
  }
}
`

export const FIND_USER_BY_ID = gql`
query findUserById($id: String!) {
  findUserById(id: $id) {
    _id
    username
    email
    userPosts
  }
}
`

export const FIND_POST_BY_ID = gql`
query findPostById($id: String!) {
  findPostById(id: $id) {
    _id
    userId
    title
    ingredients
    steps
    tags
  }
}
`
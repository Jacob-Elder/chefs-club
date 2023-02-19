import {gql} from '@apollo/client'

export const ALL_POSTS = gql`
query {
  allPosts {
    id
    userId
    title
    ingredients
    steps
    tags
  }
}
`

export const FIND_USER_BY_ID = gql`
query findUserById($id: String!) {
  findUserById(id: $id) {
    id
    username
    email
    userPosts
  }
}
`

export const FIND_POST_BY_ID = gql`
query findPostById($id: String!) {
  findPostById(id: $id) {
    id
    userId
    title
    ingredients
    steps
    tags
  }
}
`
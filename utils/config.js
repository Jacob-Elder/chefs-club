require('dotenv').config()

const SECRET = process.env.SECRET
const MONGODB_URI = process.env.NODE_ENV === 'test'
    ? process.env.MONGODB_TEST_URI
    : process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  SECRET
}
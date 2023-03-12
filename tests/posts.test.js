const mongoose = require('mongoose')
const supertest = require('supertest')
const {startServer} = require('../server.js')
const {CREATE_POST} = require("../src/queries.js")

const api = supertest(startServer())

test('CREATE_POST adds to the Database', async () => {
  
})

afterAll(async () => {
  await mongoose.connection.close()
})
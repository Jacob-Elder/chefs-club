const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userPosts: [{
        type: String,
        required: true,
        default: []
    }],
    likedPosts: [{
        type: String,
        required: true,
        default: []
    }]
})

module.exports = mongoose.model('User', userSchema)
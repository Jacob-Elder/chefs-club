const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        default: []
    }],
    likedPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        default: []
    }]
})

module.exports = mongoose.model('User', userSchema)
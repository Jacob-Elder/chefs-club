const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    ingredients: [{
        type: String,
        required: true
    }],
    steps: [{
        type: String,
        required: true
    }],
    tags: [{
        type: String,
        required: true
    }],
    date: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('Post', postSchema)
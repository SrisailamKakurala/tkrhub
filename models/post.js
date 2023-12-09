const mongoose = require('mongoose');
const moment = require('moment');

mongoose.connect('mongodb://127.0.0.1:27017/posts');


const postSchema = mongoose.Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    createdAt: {
        type: String, // Store as a string
        default:  Date.parse(Date())
    },
    likes: {
        type: Number,
        default: 0,
    },
})


module.exports = mongoose.model('post', postSchema);
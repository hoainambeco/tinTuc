const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    content: String,
    fullNameUser: String,
    Email: String,
    idNews: String,
    date: Date,
    }
);
const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;


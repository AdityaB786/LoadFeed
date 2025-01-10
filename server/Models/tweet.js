const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Tweet', tweetSchema);
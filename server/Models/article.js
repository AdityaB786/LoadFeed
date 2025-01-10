const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    title: String,
    link: String,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Article', ArticleSchema);
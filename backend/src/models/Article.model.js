const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    'article': {
        'title': String,
        'content': String,
        'date': String,
    }
})

module.exports = mongoose.model("Article", articleSchema);
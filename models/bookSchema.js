const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {type: String},
    author: {type: String},
});

module.exports = mongoose.model("book",bookSchema);
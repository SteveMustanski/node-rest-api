const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookModel = new Schema({
  title: { type: String },
  author: { type: String },
  genre: { type: String },
  bookId: { type: Number },
  read: { type: Boolean, default: false },
});

module.exports = mongoose.model('Book', bookModel);

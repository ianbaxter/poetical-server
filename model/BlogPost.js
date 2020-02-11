const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  dateEdited: {
    type: Date,
    default: Date.now
  },
  username: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Blog Post", blogPostSchema);

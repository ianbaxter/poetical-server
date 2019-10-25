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
  }
});

module.exports = mongoose.model("Blog Post", blogPostSchema);

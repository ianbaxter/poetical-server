const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  dateEdited: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  collaborators: [
    {
      id: { type: String },
      username: { type: String },
    },
  ],
  meta: {
    favs: {
      type: Number,
      default: 0,
    },
    favsUserIds: [{ type: String }],
  },
  tags: [{ type: String }],
  isPrivate: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Blog Post", postSchema);

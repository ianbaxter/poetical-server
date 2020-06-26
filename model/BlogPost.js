const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema({
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
  collaborators: {
    ids: [{ type: String }],
    usernames: [{ type: String }],
  },
  meta: {
    favs: {
      type: Number,
      default: 0,
    },
    favsUserIds: [{ type: String }],
  },
});

module.exports = mongoose.model("Blog Post", blogPostSchema);

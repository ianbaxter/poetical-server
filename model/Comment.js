const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const commentSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  parentId: {
    type: ObjectId,
    required: true,
  },
  meta: {
    favs: {
      type: Number,
      default: 0,
    },
    favsUserIds: [{ type: String }],
  },
});

module.exports = mongoose.model("Comment", commentSchema);

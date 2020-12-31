const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  blogId: {
    type: mongoose.Types.ObjectId,
    ref: "Blog",
    required: true,
  },

  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: String,
  },
  updatedAt: {
    type: String,
  },
  body: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model("Comment", commentSchema, "comments");

module.exports = Comment;

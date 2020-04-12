const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  uploaderId: {
    type: String,
    required: true,
  },
  links: {
    type: Array,
    required: false,
  },
  createdDate: {
    type: Date,
    required: false,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
    required: false,
    default: Date.now,
  },
});

module.exports = mongoose.model("comment", commentSchema);

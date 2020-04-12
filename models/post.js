const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  uploaderId: {
    type: String,
    required: true,
  },
  links: {
    type: Array,
    required: true,
  },
  likes: {
    type: Number,
    required: false,
    default: 0,
  },
  comments: {
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

module.exports = mongoose.model("post", postSchema);

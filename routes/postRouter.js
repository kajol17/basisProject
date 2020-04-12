const express = require("express");
const router = express.Router();
const postModel = require("../models/post.js");
const validationUtils = require("../utils/validation-utils.js");

router.post("/create", async (req, res) => {
  validationUtils.validateRequest(req, res);
  validationUtils.validateWritePermission(req, res);

  const post = new postModel({
    content: req.body.content,
    uploaderId: req.body.uploaderId,
    links: req.body.links,
    likes: req.body.likes,
    comments: req.body.comments,
  });
  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/fetch", (req, res) => {
  var postIds = req.body.postIds;
  postModel.find({ _id: { $in: postIds } }, function (err, post) {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json({ post: post });
  });
});

module.exports = router;

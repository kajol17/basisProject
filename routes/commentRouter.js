const express = require("express");
const router = express.Router();
const commentModel = require("../models/comment.js");

router.post("/create", async (req, res) => {
  const comment = new commentModel({
    postId: req.body.postId,
    uploaderId: req.body.uploaderId,
    text: req.body.text,
    links: req.body.links,
  });

  try {
    const newComment = await comment.save();
    res.status(201).json({ comment: newComment });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = router;

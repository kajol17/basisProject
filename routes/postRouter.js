const express = require("express");
const router = express.Router();
const postModel = require("../models/post.js");
const jwt = require("jsonwebtoken");

router.post("/create", async (req, res) => {
  validateRequest(req, res);
  validateWritePermission(req, res);

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
// Expected format of token
//Authorization: Bearer <jwt_token>
function appendToken(req, res) {
  const header = req.get("Authorization");
  if (typeof header !== "undefined") {
    const headerSplit = header.split(" ");
    const token = headerSplit[1];
    req.token = token;
  } else {
    return res.status(500).json({ message: "User not logged in! " });
  }
}

function verifyToken(req, res) {
  jwt.verify(req.token, process.env.SECRET_KEY, (err, data) => {
    if (err) {
      return res.status(403).json({ message: "User session expired!" });
    } else {
      req.user = data.user;
    }
  });
}

function validateRequest(req, res) {
  appendToken(req, res);
  verifyToken(req, res);
}

function validateWritePermission(req, res) {
  var phoneNumber = req.user.phoneNumber;
  if (isOdd(phoneNumber)) {
    return res
      .status(403)
      .json({ message: "User Does not have write permission!" });
  }
}

function isEven(number) {
  return number % 2 == 0;
}

function isOdd(number) {
  return !isEven(number);
}

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

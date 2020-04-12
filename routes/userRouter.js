const express = require("express");
const router = express.Router();
const userModel = require("../models/user.js");
const jwt = require("jsonwebtoken");
const validationUtils = require("../utils/validation-utils.js");
const userUtils = require("../utils/user-utils.js");

router.post("/signUp", async (req, res) => {
  userUtils.validateInfo(req.body, res);
  const user = new userModel({
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/signIn", (req, res) => {
  var phoneNumber = req.body.phoneNumber;
  var password = req.body.password;

  userModel.findOne({ phoneNumber: phoneNumber, password: password }, function (
    err,
    user
  ) {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    jwt.sign({ user: user }, process.env.SECRET_KEY, (err, token) => {
      return res.status(200).json({ token: token });
    });
  });
});

router.get("/fetchDetails", (req, res) => {
  validationUtils.validateRequest(req, res);
  return res.status(200).json({ user: validationUtils.relevantInfo(req.user) });
});

router.post("/updateDetails", (req, res) => {
  validationUtils.validateRequest(req, res);

  userModel.findOne({ _id: req.user._id }, function (err, user) {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (req.body.firstName) {
      user.firstName = req.body.firstName;
    }
    if (req.body.lastName) {
      user.lastName = req.body.lastName;
    }
    if (req.body.phoneNumber) {
      user.phoneNumber = req.body.phoneNumber;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }
    if (req.body.password) {
      user.password = req.body.password;
    }
    user.save();
    return res.status(200).json({ message: "Details update successfully!" });
  });
});

module.exports = router;

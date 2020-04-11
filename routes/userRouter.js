const express = require("express");
const router = express.Router();
const userModel = require("../models/user.js");
const jwt = require("jsonwebtoken");

router.post("/signUp", async (req, res) => {
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

// router.post("/updateUserInfo", (req, res) => {
//   try{

//   } catch({

//   })
// });

// router.get("/userInfo", (req, res) => {
//   try{
//     const user = await userModel.find();
//     res.json(user);
//   } catch(err){
//     res.status(500).json({message:err.message});
//   }
// });
// router.post("/", (req, res) => {});
module.exports = router;

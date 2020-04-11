const express = require("express");
const router = express.Router();
const userModel = require("../models/user.js");

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

// router.post("/signIn", (req, res) => {
//   try{

//   } catch({

//   })
// });

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

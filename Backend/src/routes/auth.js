const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ username, email, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/login", async (req,res) => {
  const {email, password} = req.body;

  try{
    const user = await User.findOne({email});
    if(!user){
      return res.status(404).json({message: "User not found"});
    }

    const isMatch = await bcrypt.compare(password, user.password);  
    if(!isMatch){
      return res.status(400).json({message: "Invalid credentials"});
    }
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"});
    res.status(200).json({token});
  }
  catch(error){
    res.status(500).json({message: "Something went wrong"});
  }
});

module.exports = router;

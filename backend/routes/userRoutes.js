// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// POST /api/users/signup
router.post("/signup", async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    // check duplicate
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ error: "UserName already exists" });
    }

    const newUser = new User({ userName, email, password });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ error: "Signup failed" });
  }
});

module.exports = router;

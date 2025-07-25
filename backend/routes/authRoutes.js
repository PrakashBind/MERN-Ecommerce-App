const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const SECRET = "jwt_secret"; // replace with dotenv later

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: "email already used" });

    const user = new User({ name, email, password });
    await user.save();
  } catch (err) {
    res.status(500).json({ message: "signup failed", error: err.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    // Node.js backend
    const token = jwt.sign(
      { user: { _id: user._id, name: user.name, email: user.email } },
      "SECRET_KEY",
      { expiresIn: "1d" }
    );
    res.json({
      message: "Login successful",
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

module.exports = router;

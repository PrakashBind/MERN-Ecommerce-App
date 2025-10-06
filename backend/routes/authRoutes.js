const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Seller = require("../models/Seller");

const SECRET = "jwt_secret"; // replace with dotenv later

// Signup route
router.post("/signup", async (req, res) => {
  console.log(req.body);
  try {
    const { name, email, password } = req.body;
    const exist = await Seller.findOne({ email });
    if (exist) return res.status(400).json({ message: "email already used" });

    const seller = new Seller({ name, email, password });
    await seller.save();
    res.json({ message: "You signup successfully.." });
  } catch (err) {
    res.status(500).json({ message: "signup failed", error: err.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;

    const seller = await Seller.findOne({ email });
    if (!seller) return res.status(404).json({ message: "seller not found" });

    const match = await bcrypt.compare(password, seller.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    // Node.js backend
    const token = jwt.sign(
      { seller: { _id: seller._id, name: seller.name, email: seller.email } },
      "SECRET_KEY",
      { expiresIn: "1d" }
    );
    res.json({
      message: "Login successful",
      token,
      seller: { name: seller.name, email: seller.email },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

module.exports = router;

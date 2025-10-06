const express = require("express");
const router = express.Router();
const multer = require("multer");
const Product = require("../models/Product");

//  Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

//  POST route: Add product (admin)
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const imageUrl = req.file ? req.file.path : "";

    const product = new Product({ name, price, description, imageUrl });
    await product.save();

    res.status(201).json({ message: "Product added successfully", product });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
});

//  GET route: Get all products (admin/user)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ _id: -1 }); // latest first
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

//  DELETE route: delete a product by ID (admin)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete product" });
  }
});

// update product by ID (admin)
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const id = req.params.id;

    const updateData = { name, price, description };
    if (req.file) {
      updateData.imageUrl = req.file.path; // 👈 update image path too
    }

    const updated = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.json({ message: "Product updated", product: updated });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
});

// Get product by ID (admin/user)
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

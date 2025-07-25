const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Product = require("../models/Product");

//  Create a new order (POST /api/orders/create)
router.post("/create", async (req, res) => {
  try {
    const {
      productId,
      customer,
      quantity,
      totalPrice,
      customerName,
      customerAddress,
      customerNumber,
    } = req.body;

    // Get product details from DB
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const order = new Order({
      productId,
      productName: product.name,
      productPrice: product.price,
      imageUrl: product.imageUrl,
      quantity,
      totalPrice,
      customerName,
      customerAddress,
      customerNumber,
      status: "Pending",
    });

    await order.save();
    res.status(201).json({ message: "Order placed", order });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error placing order", error: err.message });
  }
});

// PUT /api/orders/:id/status
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json({ message: "Order updated", order: updated });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating order", error: err.message });
  }
});

// GET all orders (for seller)

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

module.exports = router;

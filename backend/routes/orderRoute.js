const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { AllOrder } = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
// const authMiddleware = require("../middleware/auth");

// //  Create a new order (POST /api/orders/create)
// router.post("/create", async (req, res) => {
//   try {
//     const {
//       productId,
//       customer,
//       quantity,
//       totalPrice,
//       customerName,
//       customerAddress,
//       customerNumber,
//     } = req.body;

//     // Get product details from DB
//     const product = await Product.findById(productId);
//     if (!product) return res.status(404).json({ message: "Product not found" });

//     const order = new Order({
//       productId,
//       productName: product.name,
//       productPrice: product.price,
//       imageUrl: product.imageUrl,
//       quantity,
//       totalPrice,
//       customerName,
//       customerAddress,
//       customerNumber,
//       status: "Pending",
//     });

//     await order.save();
//     res.status(201).json({ message: "Order placed", order });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Error placing order", error: err.message });
//   }
// });

// PUT /api/orders/:id/status
router.put("/:id/status", async (req, res) => {
  // console.log();
  try {
    const { status } = req.body;

    const updated = await AllOrder.findByIdAndUpdate(
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
    const orders = await AllOrder.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

// POST /api/orders/allProducts
router.post("/allProducts", async (req, res) => {
  console.log("📦 Incoming order:", req.body);

  try {
    const { userId, products, totalPrice } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }
    if (!products || products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Validate productIds
    for (const p of products) {
      if (!mongoose.Types.ObjectId.isValid(p.productId)) {
        return res
          .status(400)
          .json({ message: `Invalid productId: ${p.productId}` });
      }
    }

    const order = new AllOrder({
      userId, // ✅ store as plain string (e.g., "123")
      products: products.map((p) => ({
        productId: new mongoose.Types.ObjectId(p.productId),
        quantity: p.quantity,
        price: p.price,
      })),
      totalPrice,
      status: "pending",
    });

    const savedOrder = await order.save();

    // console.log(req.body);
    await Cart.deleteOne({ userId });

    res.status(201).json({
      message: "Order created successfully 🎉",
      order: savedOrder,
    });
  } catch (error) {
    console.error("❌ Error creating order:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/orders/:userId
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await AllOrder.find({ userId }).populate(
      "products.productId"
    );
    // 👆 populate se product details bhi aa jaayenge (name, price, image)

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.json(orders);
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;

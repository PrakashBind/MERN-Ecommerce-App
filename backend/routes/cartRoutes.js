const express = require("express");
const Cart = require("../models/Cart");

const router = express.Router();

router.post("/add-to-cart", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ message: "userId and productId required" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        products: [{ productId, quantity: 1 }],
      });
      await cart.save();
      return res.json({ message: "Product added to cart", cart });
    }

    const productExists = cart.products.some(
      (p) => p.productId.toString() === productId
    );

    if (productExists) {
      return res
        .status(400)
        .json({ message: "Already added this product in cart" });
    }

    cart.products.push({ productId, quantity: 1 });
    await cart.save();
    return res.json({ message: "Product added to cart", cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.json({ message: "Cart is empty" });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete product from cart
router.delete("/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Filter out the product
    const updatedProducts = cart.products.filter(
      (p) => p.productId.toString() !== productId
    );

    // Agar product delete hone ke baad bhi cart me kuchh bacha hai
    if (updatedProducts.length === cart.products.length) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    cart.products = updatedProducts;
    await cart.save();

    res.json({
      message: "Product removed from cart",
      cart,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

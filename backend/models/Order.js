const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema(
//   {
//     productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
//     productName: String,
//     productPrice: Number,
//     imageUrl: String,
//     quantity: { type: Number, default: 1 },
//     totalPrice: { type: Number, required: true },
//     customerName: String,
//     customerAddress: String,
//     customerNumber: Number,
//     status: { type: String, default: "Pending" },
//   },
//   { timestamps: true }
// );

const allOrderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: "pending" },
});

module.exports = {
  // Order: mongoose.model("Order", orderSchema),
  AllOrder: mongoose.model("AllOrder", allOrderSchema),
};

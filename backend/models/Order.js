const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    productName: String,
    productPrice: Number,
    imageUrl: String,
    quantity: { type: Number, default: 1 },
    totalPrice: { type: Number, required: true },
    customerName: String,
    customerAddress: String,
    customerNumber: Number,
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);

// models/Order.js
// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema(
//   {
//     productId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Product",
//     },
//     customerId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//     quantity: {
//       type: Number,
//       default: 1,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Order", orderSchema);

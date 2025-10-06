// const mongoose = require("mongoose");

// const cartSchema = new mongoose.Schema({
//   userId: { type: String, required: true },
//   productId: { type: String, required: true },
//   quantity: { type: Number, default: 1 },
// });

// module.exports = mongoose.model("Cart", cartSchema);

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  quantity: { type: Number, default: 1 },
});

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  products: [productSchema],
});

module.exports = mongoose.model("Cart", cartSchema);

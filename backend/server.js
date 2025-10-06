const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoutes = require("./routes/productRoute");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoute");
const routeCart = require("./routes/cartRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // static image access

// Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", routeCart);

// Connect MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/seller-ecom", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(5000, () => {
  console.log("server running on http://localhost:5000");
});

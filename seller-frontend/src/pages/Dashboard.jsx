import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  // Fetch Products
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log("Error loading products", err));
  }, []);

  // Fetch Orders
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.log("Error loading orders", err));
  }, []);

  // Calculate Total Sales
  const totalSales = orders.reduce(
    (total, order) => total + order.quantity * order.productPrice,
    0
  );

  return (
    <div>
      <h1>📊 Dashboard</h1>
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "20px",
        }}
      >
        <div style={cardStyle}>
          <h3>Total Products</h3>
          <p style={numberStyle}>{products.length}</p>
        </div>

        <div style={cardStyle}>
          <h3>Total Orders</h3>
          <p style={numberStyle}>{orders.length}</p>
        </div>

        <div style={cardStyle}>
          <h3>Total Sales</h3>
          <p style={numberStyle}>₹{totalSales}</p>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  width: "200px",
  background: "#fff",
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const numberStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  marginTop: "10px",
};

export default Dashboard;

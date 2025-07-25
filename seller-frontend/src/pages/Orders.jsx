import { useState, useEffect } from "react";
import axios from "axios"; // ✅ required import

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Error loading orders", err));
  }, []);

  const markShipped = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/orders/${id}/status`,
        {
          status: "Shipped",
        }
      );
      const updated = res.data.order;
      setOrders((prev) =>
        prev.map((order) => (order._id === updated._id ? updated : order))
      );
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Failed to mark as shipped");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛒 Orders</h1>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {orders.map((order) => (
            <div
              key={order._id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "15px",
                display: "flex",
                gap: "20px",
                alignItems: "center",
              }}
            >
              <img
                src={`http://localhost:5000/${order.imageUrl}`}
                alt={order.productName}
                width="100"
                style={{ borderRadius: "5px" }}
              />
              <div style={{ flex: 1 }}>
                <h4>{order.productName}</h4>
                <p>
                  👤 <strong>Customer:</strong> {order.customer}
                </p>
                <p>
                  🔢 <strong>Qty:</strong> {order.quantity}
                </p>
                <p>
                  📦 <strong>Status:</strong>{" "}
                  <span
                    style={{
                      color: order.status === "Pending" ? "orange" : "green",
                      fontWeight: "bold",
                    }}
                  >
                    {order.status}
                  </span>
                </p>
              </div>

              {order.status === "Pending" && (
                <button
                  onClick={() => markShipped(order._id)}
                  style={{
                    background: "green",
                    color: "white",
                    border: "none",
                    padding: "10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Mark as Shipped
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;

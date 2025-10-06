// import { useState, useEffect } from "react";
// import axios from "axios";

// function Orders() {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/orders")
//       .then((res) => setOrders(res.data))
//       .catch((err) => console.error("Error loading orders", err));
//   }, []);

//   console.log(orders);
//   console.log(orders.userId);
// const markShipped = async (id) => {
//   try {
//     const res = await axios.put(
//       `http://localhost:5000/api/orders/${id}/status`,
//       {
//         status: "Shipped",
//       }
//     );
//     const updated = res.data.order;
//     setOrders((prev) =>
//       prev.map((order) => (order._id === updated._id ? updated : order))
//     );
//   } catch (err) {
//     console.error("Failed to update status", err);
//     alert("Failed to mark as shipped");
//   }
// };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>📦 Orders</h1>

//       {orders.length === 0 ? (
//         <p>No orders yet.</p>
//       ) : (
//         <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
//           {orders.map((order) => (
//             <div
//               key={order._id}
//               style={{
//                 border: "1px solid #ccc",
//                 borderRadius: "8px",
//                 padding: "15px",
//                 display: "flex",
//                 flexWrap: "wrap", // ✅ wrap on small screens
//                 gap: "20px",
//                 background: "lightgray",
//               }}
//             >
//               {/* Column 1 - Image */}
//               <div style={{ flex: "1 1 120px" }}>
//                 <img
//                   src={`http://localhost:5000/${order.imageUrl}`}
//                   alt={order.productName}
//                   width="120"
//                   style={{ borderRadius: "8px" }}
//                 />
//               </div>

//               {/* Column 2 - Product Info */}
//               <div style={{ flex: "2 1 200px" }}>
//                 <h4>{order.productName}</h4>
//                 <p>
//                   💵 <strong>Price:</strong> ₹{order.productPrice}
//                 </p>
//                 <p>
//                   🔢 <strong>Qty:</strong> {order.quantity}
//                 </p>
//                 <p>
//                   💰 <strong>Total:</strong> ₹{order.totalPrice}
//                 </p>
//               </div>

//               {/* Column 3 - Customer Info */}
//               <div style={{ flex: "2 1 200px" }}>
//                 <p>
//                   👤 <strong>CustomerId:</strong> {order.userId}
//                 </p>
//                 <p>
//                   📞 <strong>Phone:</strong> {order.customerNumber}
//                 </p>
//                 <p>
//                   📍 <strong>Address:</strong> {order.customerAddress}
//                 </p>
//               </div>

//               {/* Column 4 - Status / Action */}
//               <div style={{ flex: "1 1 150px" }}>
//                 <p>
//                   📦 <strong>Status:</strong>{" "}
//                   <span
//                     style={{
//                       color: order.status === "Pending" ? "orange" : "green",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     {order.status}
//                   </span>
//                 </p>
//                 {order.status === "Pending" && (
// <button
//   onClick={() => markShipped(order._id)}
//   style={{
//     background: "green",
//     color: "white",
//     border: "none",
//     padding: "8px 12px",
//     borderRadius: "5px",
//     marginTop: "10px",
//     cursor: "pointer",
//   }}
// >
//   Mark as Shipped
// </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Orders;

import React, { useEffect, useState } from "react";

const OderProducts = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/orders/`);
        const data = await res.json();
        console.log(data);
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const markShipped = async (id) => {
    // console.log(id)
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
    <div className="orders-container">
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order">
            <h3>Order ID: {order._id}</h3>
            <p>Total Price: ₹{order.totalPrice}</p>
            {/* <p>Status: {order.status}</p> */}

            <div className="products">
              {order.products.map((p, index) => (
                <div key={index} className="product">
                  <img
                    src={`http://localhost:5000/${p.productId.imageUrl}`}
                    alt={p.name}
                    className="product-img"
                  />
                  <div className="product-info">
                    <p>ProductId: {p.productId?._id}</p>
                    <p>Quantity: {p.quantity}</p>
                    <p>Price: ₹{p.price}</p>
                    <button
                      onClick={() => markShipped(order._id)}
                      style={{
                        background: "green",
                        color: "white",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "5px",
                        marginTop: "10px",
                        cursor: "pointer",
                      }}
                    >
                      Mark as Shipped
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      {/* CSS Styles */}
      <style>{`
        .orders-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        .order {
          border: 1px solid #ddd;
          border-radius: 10px;
          padding: 15px;
          margin-bottom: 20px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          transition: transform 0.2s;
        }

        .order:hover {
          transform: translateY(-3px);
        }

        .products {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          margin-top: 10px;
        }

        .product {
            display: flex;
            align-items: center;
            border: 1px solid #ccc;
            border-radius: 8px;
            padding: 10px;
            background-color: #f9f9f9;
            gap: 15px;
            flex-wrap: wrap; /* ensures mobile responsiveness */
        }

        .product-img {
            width: 120px; /* fixed width for image */
            height: 120px;
            object-fit: cover;
            border-radius: 8px;
        }

        .product-info {
            flex: 1; /* takes remaining space */
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
        h1 {
          text-align: center;
          margin-bottom: 30px;
        }

        @media (max-width: 768px) {
          .products {
            flex-direction: column;
          }

          .product {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .orders-container {
            padding: 10px;
          }

          .order {
            padding: 10px;
          }

          .product {
            padding: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default OderProducts;

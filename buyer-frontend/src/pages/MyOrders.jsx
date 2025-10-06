  // import React, { useEffect, useState } from "react";
  // import axios from "axios";

  // const MyOrders = () => {
  //   const [orders, setOrders] = useState([]);

  //   useEffect(() => {
  //     const fetchOrders = async () => {
  //       try {
  //         const res = await axios.get("/api/orders/my-orders");
  //         setOrders(res.data);
  //       } catch (err) {
  //         console.error("Failed to fetch orders", err);
  //       }
  //     };
  //     fetchOrders();
  //   }, []);

  //   return (
  //     <div className="p-4">
  //       <h2 className="text-xl font-bold mb-4">📦 My Orders</h2>
  //       {orders.length === 0 ? (
  //         <p>No orders found.</p>
  //       ) : (
  //         <div className="grid gap-4">
  //           {orders.map((order) => (
  //             <div key={order._id} className="border p-4 rounded-md shadow-sm">
  //               <p>
  //                 <strong>Product:</strong> {order.product.name}
  //               </p>
  //               <p>
  //                 <strong>Quantity:</strong> {order.quantity}
  //               </p>
  //               <p>
  //                 <strong>Total:</strong> ₹{order.totalPrice}
  //               </p>
  //               <p>
  //                 <strong>Status:</strong> {order.status}
  //               </p>
  //               <p>
  //                 <strong>Ordered At:</strong>{" "}
  //                 {new Date(order.createdAt).toLocaleString()}
  //               </p>
  //             </div>
  //           ))}
  //         </div>
  //       )}
  //     </div>
  //   );
  // };

  // export default MyOrders;

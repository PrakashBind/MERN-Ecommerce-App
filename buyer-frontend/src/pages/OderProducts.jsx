import React, { useEffect, useState } from "react";

const OderProducts = () => {
  const [orders, setOrders] = useState([]);
  const userId = "123"; // 👈 yahan pe actual logged-in user ka id aana chahiye

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/orders/${userId}`);
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [userId]);

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

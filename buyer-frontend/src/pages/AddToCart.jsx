import React, { useEffect, useState } from "react";
import axios from "axios";

const AddToCart = () => {
  const [cart, setCart] = useState({ products: [] });
  const [productsDetails, setProductsDetails] = useState([]);
  const userId = "123"; // Replace with actual logged-in user ID

  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/cart/${userId}`);
      setCart(res.data);

      const products = res.data.products || [];
      const details = await Promise.all(
        products.map((p) =>
          axios
            .get(`http://localhost:5000/api/products/${p.productId}`)
            .then((res) => ({
              ...res.data,
              quantity: p.quantity,
            }))
            .catch(() => ({
              productId: p.productId,
              name: "Product not found",
              description: "",
              price: 0,
              imageUrl: "https://via.placeholder.com/120?text=No+Image",
              quantity: p.quantity,
            }))
        )
      );

      setProductsDetails(details);
    } catch (err) {
      console.error("Failed to fetch cart", err);
    }
  };

  // ✅ useEffect me fetchCart call
  useEffect(() => {
    fetchCart();
  }, [userId]);

  // ✅ delete ke baad fetchCart call
  const handleDelete = async (productId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/cart/${userId}/${productId}`
      );
      await fetchCart(); // 🔥 Re-fetch cart after delete
      alert("Product removed from cart ✅");
    } catch (err) {
      console.error("Failed to delete product", err);
      alert("Something went wrong ❌");
    }
  };

  // ✅ total quantity & price
  const totalQuantity = productsDetails.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const totalPrice = productsDetails.reduce(
    (sum, item) => sum + item.quantity * (item.price || 0),
    0
  );

  const handleBuyAll = async () => {
    if (productsDetails.length === 0) return alert("Cart is empty!");

    try {
      const orderData = {
        userId: userId, // unique id of the user
        products: productsDetails.map((p) => ({
          productId: p._id,
          quantity: p.quantity,
          price: p.price,
        })),
        totalPrice,
      };

      const response = await fetch(
        "http://localhost:5000/api/orders/allProducts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Purchase successful!");
        fetchCart();
      } else {
        alert("Purchase failed: " + result.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong during purchase.");
    }
  };

  // console.log("products : ", productsDetails);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {productsDetails.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="products">
          {productsDetails.map((p) => (
            <div key={p.productId} className="product-item">
              <div className="left">
                <img
                  src={`http://localhost:5000/${p.imageUrl}`}
                  alt={p.name}
                  className="product-img"
                />
                <div className="product-info">
                  <h3>{p.name}</h3>
                  <p className="desc">{p.description}</p>
                  <p className="price">
                    ₹{p.price} × {p.quantity} ={" "}
                    <strong>₹{p.price * p.quantity}</strong>
                  </p>
                </div>
              </div>

              {/* Delete button right side */}
              <button
                className="delete-btn"
                onClick={() => handleDelete(p._id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="cart-summary">
        <p>
          Total Products: <strong>{totalQuantity}</strong>
        </p>
        <p>
          Total Price: <strong>₹{totalPrice}</strong>
        </p>
        <button onClick={handleBuyAll}>Buy All Products</button>
      </div>

      {/* CSS */}
      <style>{`
        .cart-container {
          max-width: 1000px;
          margin: auto;
          padding: 20px;
        }
        h2 {
          text-align: center;
          margin-bottom: 25px;
        }
        .products {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .product-item {
          display: flex;
          gap: 15px;
          padding: 15px;
          border: 1px solid #ddd;
          border-radius: 10px;
          background: #fff;
          align-items: center;
          box-shadow: 0 2px 6px rgba(0,0,0,0.08);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .product-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.12);
        }
        .product-img {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: 8px;
          border: 1px solid #eee;
        }
        .product-info {
          flex: 1;
        }
        .product-info h3 {
          margin: 0 0 5px 0;
          font-size: 1.1rem;
        }
        .desc {
          margin: 5px 0;
          color: #555;
          font-size: 0.9rem;
        }
        .price {
          font-size: 1rem;
          color: #333;
          margin-top: 8px;
        }
        .cart-summary {
          position: sticky;
          bottom: 0;
          background: #fefefe;
          border-top: 1px solid #ddd;
          padding: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          margin-top: 25px;
          flex-wrap: wrap;
          box-shadow: 0 -2px 6px rgba(0,0,0,0.08);
        }
        .cart-summary button {
          padding: 12px 24px;
          background: #28a745;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1rem;
          transition: background 0.2s ease;
        }
        .cart-summary button:hover {
          background: #218838;
        }

        .product-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  background: #f9f9f9;
}

.left {
  display: flex;
  gap: 15px;
  align-items: center;
}

.product-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.product-info {
  flex: 1;
}

.delete-btn {
  background: red;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

.delete-btn:hover {
  background: darkred;
}

        @media (max-width: 768px) {
          .product-item {
            flex-direction: column;
            align-items: flex-start;
          }
          .product-img {
            width: 100%;
            height: 200px;
          }
          .cart-summary {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          .cart-summary button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default AddToCart;

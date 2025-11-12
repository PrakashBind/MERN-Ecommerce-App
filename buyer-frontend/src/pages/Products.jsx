import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("PRODUCTS_URL")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>🛍 All Products</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {products.map((product) => (
            <div
              key={product._id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                width: "200px",
                borderRadius: "8px",
              }}
            >
              <img
                src={`http://localhost:5000/${product.imageUrl}`}
                alt={product.name}
                style={{ width: "100%", height: "150px", objectFit: "cover" }}
              />
              <h4>{product.name}</h4>
              <p>₹{product.price}</p>
              <Link to={`/product/${product._id}`}>
                <button
                  style={{
                    background: "#333",
                    color: "#fff",
                    border: "none",
                    padding: "5px 10px",
                    marginTop: "10px",
                    borderRadius: "5px",
                  }}
                >
                  View
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to load products", err));
  }, []);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>🛍️ Our Products</h2>

      <input
        type="text"
        placeholder="🔍 Search product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "20px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      {filtered.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {filtered.map((p) => (
            <div
              key={p._id}
              style={{
                width: "200px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
              }}
            >
              <img
                src={`http://localhost:5000/${p.imageUrl}`}
                alt={p.name}
                style={{ width: "100%", height: "150px", objectFit: "cover" }}
              />
              <h4>{p.name}</h4>
              <p>₹{p.price}</p>
              <Link to={`/product/${p._id}`}>
                <button
                  style={{
                    background: "green",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;

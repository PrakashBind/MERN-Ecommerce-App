import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MyProducts({ product }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [expandedDesc, setExpandedDesc] = useState({});

  const toggleText = (id) => {
    setExpandedDesc((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching:", err));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this product?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete product");
    }
  };

  const filtered = products.filter((p) => {
    const nameMatch = p.name.toLowerCase().includes(search.toLowerCase());
    const priceMatch = p.price.toString().includes(search); // convert price to string
    return nameMatch || priceMatch;
  });

  return (
    <div style={{ padding: "0px 20px" }}>
      <h1>My Products</h1>

      {/*  Search Bar */}
      <input
        type="text"
        placeholder="🔍 Search by name. or price..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "20px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />

      {/*  No products at all */}
      {products.length === 0 ? (
        <p>No products added yet.</p>
      ) : (
        <>
          {/*  No matching search result */}
          {filtered.length === 0 ? (
            <p>No products match your search.</p>
          ) : (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
              {filtered.map((product) => (
                <div
                  key={product._id}
                  style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    width: "200px",
                    borderRadius: "8px",
                    boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
                  }}
                >
                  <img
                    src={`http://localhost:5000/${product.imageUrl}`}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "6px",
                    }}
                  />
                  <h4>{product.name}</h4>
                  <p>₹{product.price}</p>

                  <small style={{ fontSize: "14px" }}>
                    {expandedDesc[product._id]
                      ? product.description
                      : product.description.length > 50
                      ? product.description.slice(0, 50) + "..."
                      : product.description}
                    <br />
                    {product.description.length > 50 && (
                      <button
                        onClick={() => toggleText(product._id)}
                        style={{
                          border: "none",
                          background: "none",
                          color: "blue",
                          cursor: "pointer",
                          padding: 0,
                        }}
                      >
                        {expandedDesc[product._id] ? "Less ▲" : "More ▼"}
                      </button>
                    )}
                  </small>

                  {/* <small>{product.description}</small> */}
                  <br />
                  <button
                    onClick={() => handleDelete(product._id)}
                    style={{
                      background: "red",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer",
                      marginTop: "10px",
                      borderRadius: "4px",
                    }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => navigate(`/edit-product/${product._id}`)}
                    style={{
                      background: "orange",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer",
                      marginTop: "10px",
                      marginLeft: "10px",
                      borderRadius: "4px",
                    }}
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default MyProducts;

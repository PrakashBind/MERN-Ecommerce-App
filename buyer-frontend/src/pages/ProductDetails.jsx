import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Failed to load product", err));
  }, [id]);

  const handleBuyNow = () => {
    navigate(`/checkout/${product._id}`);
  };

  if (!product.name) return <p>Loading...</p>;

  return (
    <div className="product-details">
      <div className="image-box">
        <img
          src={`http://localhost:5000/${product.imageUrl}`}
          alt={product.name}
        />
      </div>

      <div className="content-box">
        <h2>{product.name}</h2>
        <p>
          <strong>Price:</strong> ₹{product.price}
        </p>
        <p>
          <strong>Description:</strong> {product.description}
        </p>

        <button onClick={handleBuyNow} style={{ padding: "10px 20px" }}>
          Buy Now
        </button>
      </div>

      {/* CSS Styles */}
      <style>{`
        .product-details {
          display: flex;
          gap: 30px;
          padding: 30px;
          max-width: 900px;
          margin: auto;
          flex-wrap: wrap;
        }

        .image-box {
          flex: 1 1 300px;
        }

        .image-box img {
          width: 100%;
          height: 300px;
          object-fit: cover;
          border-radius: 8px;
        }

        .content-box {
          flex: 1 1 300px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .buy-btn {
          background: blue;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 20px;
          width: fit-content;
        }

        @media (max-width: 768px) {
          .product-details {
            flex-direction: column;
            padding: 20px;
          }

          .image-box img {
            width: auto;
            height: auto;
          }

          .buy-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export default ProductDetails;

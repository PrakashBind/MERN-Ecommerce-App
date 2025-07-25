import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "200px",
        height: "100vh",
        background: "#f2f2f2",
        padding: "20px",
        position: "fixed", // 👈 fixed sidebar
        top: 0,
        left: 0,
      }}
    >
      <h3>Seller Panel</h3>
      <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
        <li style={{ marginBottom: "10px" }}>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link to="/add-product">Add Product</Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link to="/my-products">My Products</Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link to="/orders">Orders</Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

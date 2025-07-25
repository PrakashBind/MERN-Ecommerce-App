import Sidebar from "../components/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";

function SellerLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div style={{ display: "flex", marginLeft: "230px", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px" }}>
        {/* 🔝 Topbar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            borderBottom: "1px solid #ddd",
            paddingBottom: "10px",
          }}
        >
          <h3>Seller Panel</h3>
          <button onClick={handleLogout} style={{ padding: "5px 10px" }}>
            Logout
          </button>
        </div>

        {/* Page Content */}
        <Outlet />
      </div>
    </div>
  );
}

export default SellerLayout;

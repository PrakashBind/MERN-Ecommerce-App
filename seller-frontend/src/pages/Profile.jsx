import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded.user); // 👈 if you saved user inside token as `user`
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <h1>👤 Profile</h1>
      <div
        style={{ padding: "20px", border: "1px solid #ccc", width: "300px" }}
      >
        <p>
          <strong>Name:</strong> {user.name || "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {user.email || "N/A"}
        </p>
        <p>
          <strong>ID:</strong> {user._id || "N/A"}
        </p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Profile;

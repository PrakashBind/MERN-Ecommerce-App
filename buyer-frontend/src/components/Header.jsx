import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Update isMobile on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setShowMenu(false); // auto close on desktop
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <header style={headerStyle}>
      {/* Logo */}
      <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
        <h2>🛒 ShopEasy</h2>
      </Link>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={toggleMenu} style={hamburgerStyle}>
        ☰
      </div>

      {/* Navigation */}
      <nav
        className="nav-links"
        style={{
          ...navStyle,
          display: isMobile ? (showMenu ? "flex" : "none") : "flex",
        }}
      >
        <Link to="/" style={linkStyle} onClick={() => setShowMenu(false)}>
          Home
        </Link>
        <Link
          to="/products"
          style={linkStyle}
          onClick={() => setShowMenu(false)}
        >
          Products
        </Link>
        <Link
          to="/addtocart"
          style={linkStyle}
          onClick={() => setShowMenu(false)}
        >
          Cart
        </Link>
        <Link
          to="/oderproducts"
          style={linkStyle}
          onClick={() => setShowMenu(false)}
        >
          Oders
        </Link>
        <Link to="/login" style={linkStyle} onClick={() => setShowMenu(false)}>
          Login
        </Link>
      </nav>

      {/* CSS Styles */}
      <style>{`
        @media (max-width: 768px) {
          .nav-links {
            flex-direction: column;
            position: absolute;
            top: 60px;
            right: 0;
            background: #222;
            width: 100%;
            padding: 20px;
            z-index: 1000;
          }
          .hamburger {
            display: block !important;
          }
        }

        .nav-links {
          transition: all 0.3s ease;
        }
      `}</style>
    </header>
  );
}

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 30px",
  background: "#222",
  color: "#fff",
  position: "relative",
};

const navStyle = {
  display: "flex",
  gap: "20px",
  alignItems: "center",
};

const hamburgerStyle = {
  display: "none",
  fontSize: "26px",
  cursor: "pointer",
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "16px",
};


export default Header;

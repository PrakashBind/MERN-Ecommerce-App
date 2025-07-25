import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import MyProducts from "./pages/MyProducts";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import EditProduct from "./pages/EditProduct";

import SellerLayout from "./layout/SellerLayout";
import PrivateRoute from "./components/PrivateRoute"; // ✅

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ✅ Protected Routes inside SellerLayout */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <SellerLayout />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="my-products" element={<MyProducts />} />
          <Route path="orders" element={<Orders />} />
          <Route path="profile" element={<Profile />} />
          <Route path="edit-product/:id" element={<EditProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

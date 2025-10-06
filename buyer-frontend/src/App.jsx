import ProductDetails from "./pages/ProductDetails";
import Header from "./components/Header";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Checkout from "./pages/CheckOut";
import { Routes, Route } from "react-router-dom";
import AddToCart from "./pages/AddToCart";
import OderProducts from "./pages/OderProducts";


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route path="/addtocart/" element={<AddToCart />} />
        <Route path="/oderproducts/" element={<OderProducts />} />
      </Routes>
    </>
  );
}

export default App;

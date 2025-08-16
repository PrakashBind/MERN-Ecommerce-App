import ProductDetails from "./pages/ProductDetails";
import Header from "./components/Header";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Checkout from "./pages/CheckOut";
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout/:id" element={<Checkout />} />
      </Routes>
    </>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductListing from "./pages/ProductListing";
import Login from "./pages/Login";
import OrderPlacement from "./pages/OrderPlacement";

import ProductDetail from "./pages/ProductDetail";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <header className="header">
        <div className="nav">
          <div className="brand">
            <Link to="/" className="nav-link" style={{ paddingLeft: 0 }}>
              E-Shop
            </Link>
          </div>
          <div className="nav-links">
            <Link to="/products" className="nav-link">Products</Link>
            <Link to="/order" className="nav-link">Place Order</Link>
            <Link to="/login" className="nav-link">Login</Link>
          </div>
        </div>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/order" element={<OrderPlacement />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Cart from "./pages/Cart";
import AllProducts from "./pages/AllProducts";
import Product from "./pages/Product";
import SearchResults from "./pages/SearchResults";
import Login from "./pages/Login";
import UserAccount from "./pages/UserAccount";
import { useSelector } from "react-redux";
import NotFound from "./pages/NotFound";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <BrowserRouter>
      <div className="d-flex flex-column justify-content-between vh-100">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate replace to="/products" />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/:userId" element={isLoggedIn ? <UserAccount /> : <Navigate to="/" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

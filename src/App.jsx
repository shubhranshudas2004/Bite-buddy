import { BrowserRouter, Link, Route, Routes, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCart, selectAuth, logout } from "./store";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./Home";
import Veg from "./Veg";
import NonVeg from "./NonVeg";
import Drinks from "./Drinks";
import ContactUs from "./ContactUs";
import Orders from "./Orders";
import Cart from "./Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AboutUs from "./Aboutus";
import NotFound from "./Notfound";
import Login from "./Login";
import SignUp from "./SignUp";
import Search from "./Search";

function App() {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const auth = useSelector(selectAuth);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    dispatch(logout());
    // Optionally clear localStorage loggedInUser
    localStorage.removeItem("loggedInUser");
  };

  return (
    <BrowserRouter>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-black fixed-top shadow-sm">
        <div className="container-fluid">
          {/* Brand */}
          <Link to="/home" className="navbar-brand fw-bold fs-4 text-white">
            🍴 Bite Buddy
          </Link>

          {/* Search bar stretched */}
          <div className="flex-grow-1 mx-3">
            <form
              className="d-flex w-100"
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                const query = e.target.elements.search.value.trim();
                if (query) {
                  window.location.href = `/search?query=${encodeURIComponent(
                    query
                  )}`;
                }
              }}
            >
              <input
                name="search"
                className="form-control me-2 w-100"
                type="search"
                placeholder="Search food..."
                aria-label="Search"
              />
              <button className="btn btn-outline-light" type="submit">
                🔍
              </button>
            </form>
          </div>

          {/* Toggle button for mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/home" className="nav-link text-white">
                  🏡 Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/veg" className="nav-link text-white">
                  🫛 Veg
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/nonveg" className="nav-link text-white">
                  🍗 NonVeg
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/drinks" className="nav-link text-white">
                  🍷 Drinks
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/cart" className="nav-link text-white">
                  🛒 Cart ({cartCount})
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/orders" className="nav-link text-white">
                  📦 Orders
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/contactus" className="nav-link text-white">
                  📲 Contact Us
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/aboutus" className="nav-link text-white">
                  ℹ️ About Us
                </Link>
              </li>
              <li className="nav-item">
                {auth.isLoggedIn ? (
                  <div className="d-flex align-items-center">
                    <span className="nav-link text-white me-2">
                      👤 {auth.user.name || auth.user.email}
                    </span>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link to="/login" className="nav-link text-white">
                    👤 Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Routes */}

      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/veg" element={<Veg />} />
        <Route path="/nonveg" element={<NonVeg />} />
        <Route path="/drinks" element={<Drinks />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/search" element={<Search />} />

        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={2000} />
    </BrowserRouter>
  );
}

export default App;

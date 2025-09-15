import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if (!email || !password) {
      Swal.fire("Error", "Please fill in all fields!", "error");
      return;
    }

    // 🔑 Get users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = existingUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      Swal.fire(
        "Invalid Credentials",
        "Email or password is incorrect. Try again!",
        "error"
      );
      return;
    }

    Swal.fire("Success", "Logged in successfully!", "success").then(() => {
      // You can also save logged in user in localStorage/session
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
      navigate("/cart"); // 👈 redirect to cart after login
    });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-1000"
      style={{
        backgroundImage: `url('/pizza.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1,
        }}
      ></div>

      <div
        className="shadow-lg rounded position-relative"
        style={{
          width: "450px",
          background: "rgba(255, 255, 255, 0.95)",
          padding: "50px",
          borderRadius: "20px",
          zIndex: 2,
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="text-center mb-4">
          <h1
            style={{
              color: "#ff6b35",
              fontWeight: "800",
              fontSize: "2.5rem",
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            🍕 Bite Buddy
          </h1>
          <h3 style={{ color: "#1e90ff", fontWeight: "600" }}>Welcome Back!</h3>
          <p style={{ color: "#666" }}>
            Sign in to your account to continue ordering delicious food
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="form-label fw-bold">📧 Email Address</label>
            <input
              ref={emailRef}
              type="email"
              placeholder="Enter your email"
              className="form-control form-control-lg"
              style={{ borderRadius: "10px", border: "2px solid #e9ecef" }}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold">🔒 Password</label>
            <div className="input-group">
              <input
                ref={passwordRef}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="form-control form-control-lg"
                style={{ borderRadius: "10px 0 0 10px", border: "2px solid #e9ecef" }}
              />
              <button
                type="button"
                className="btn btn-outline-secondary btn-lg"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  borderRadius: "0 10px 10px 0",
                  border: "2px solid #e9ecef",
                  borderLeft: "none",
                }}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn w-100 mt-4 py-3"
            style={{
              background: "linear-gradient(135deg, #ff6b35, #f7931e)",
              border: "none",
              borderRadius: "12px",
              fontWeight: "700",
              fontSize: "1.2rem",
              color: "white",
            }}
          >
            🚀 Login to Your Account
          </button>
        </form>

        <div className="text-center mt-4">
          <small>
            Don’t have an account?{" "}
            <Link
              to="/signup"
              style={{ color: "#ff6b35", fontWeight: "600", textDecoration: "none" }}
            >
              Create one here
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}

export default Login;

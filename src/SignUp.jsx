import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function SignUp() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    const name = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const confirmPassword = confirmPasswordRef.current.value.trim();

    if (!name || !email || !password || !confirmPassword) {
      Swal.fire("Error", "Please fill in all fields!", "error");
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire("Error", "Passwords do not match!", "error");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      Swal.fire(
        "Invalid Password",
        "Password must be at least 8 characters and contain both uppercase and lowercase letters.",
        "error"
      );
      return;
    }

    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = existingUsers.find((user) => user.email === email);

    if (userExists) {
      Swal.fire("Error", "User already exists! Please login instead.", "error");
      return;
    }

    // Save new user
    const newUser = { name, email, password };
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    Swal.fire("Success", "Account created successfully!", "success").then(() => {
      navigate("/login");
    });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-70"
      style={{
        backgroundImage: `url('/burger.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
      }}
    >
      {/* Overlay for better readability */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1,
        }}
      ></div>

      <div
        className="shadow-lg rounded position-relative"
        style={{
          width: "500px",
          background: "rgba(255, 255, 255, 0.95)",
          padding: "50px",
          boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
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
              marginBottom: "10px"
            }}
          >
            🍔 Bite Buddy
          </h1>
          <h3
            style={{
              color: "#1e90ff",
              fontWeight: "600",
              fontSize: "1.5rem"
            }}
          >
            Join Our Food Family!
          </h3>
          <p style={{ color: "#666", fontSize: "1rem" }}>
            Create your account and start ordering delicious food
          </p>
        </div>

        <form onSubmit={handleSignUp}>
          <div className="mb-3">
            <label className="form-label fw-bold" style={{ color: "#333" }}>
              👤 Full Name
            </label>
            <input
              ref={nameRef}
              type="text"
              placeholder="Enter your full name"
              className="form-control form-control-lg"
              style={{
                borderRadius: "10px",
                border: "2px solid #e9ecef",
                padding: "12px",
                fontSize: "1rem"
              }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold" style={{ color: "#333" }}>
              📧 Email Address
            </label>
            <input
              ref={emailRef}
              type="email"
              placeholder="Enter your email"
              className="form-control form-control-lg"
              style={{
                borderRadius: "10px",
                border: "2px solid #e9ecef",
                padding: "12px",
                fontSize: "1rem"
              }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold" style={{ color: "#333" }}>
              🔒 Password
            </label>
            <div className="input-group">
              <input
                ref={passwordRef}
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                className="form-control form-control-lg"
                style={{
                  borderRadius: "10px 0 0 10px",
                  border: "2px solid #e9ecef",
                  padding: "12px",
                  fontSize: "1rem"
                }}
              />
              <button
                type="button"
                className="btn btn-outline-secondary btn-lg"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  borderRadius: "0 10px 10px 0",
                  border: "2px solid #e9ecef",
                  borderLeft: "none"
                }}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold" style={{ color: "#333" }}>
              🔒 Confirm Password
            </label>
            <div className="input-group">
              <input
                ref={confirmPasswordRef}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className="form-control form-control-lg"
                style={{
                  borderRadius: "10px 0 0 10px",
                  border: "2px solid #e9ecef",
                  padding: "12px",
                  fontSize: "1rem"
                }}
              />
              <button
                type="button"
                className="btn btn-outline-secondary btn-lg"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  borderRadius: "0 10px 10px 0",
                  border: "2px solid #e9ecef",
                  borderLeft: "none"
                }}
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>
            <small className="text-muted mt-1 d-block">
              Password must be 8+ characters with uppercase & lowercase letters
            </small>
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
              boxShadow: "0 4px 15px rgba(255, 107, 53, 0.4)",
              transition: "all 0.3s ease"
            }}
            onMouseOver={(e) => e.target.style.transform = "translateY(-2px)"}
            onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
          >
            🎉 Create My Account
          </button>
        </form>

        <div className="text-center mt-4">
          <small style={{ color: "#666", fontSize: "0.9rem" }}>
            Already have an account?{" "}
            <a
              href="/login"
              style={{
                color: "#ff6b35",
                textDecoration: "none",
                fontWeight: "600"
              }}
            >
              Login here
            </a>
          </small>
        </div>

        <div className="text-center mt-3">
          <small style={{ color: "#999", fontSize: "0.8rem" }}>
            By signing up, you agree to our Terms of Service and Privacy Policy
          </small>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

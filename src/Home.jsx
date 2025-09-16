// Home.jsx
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "bootstrap"; // import Carousel class directly

function Home() {
  const heroRef = useRef(null);
  const foodRef = useRef(null);
  const reviewRef = useRef(null);

  useEffect(() => {
    let heroInstance = null;
    let foodInstance = null;
    let reviewInstance = null;

    try {
      // Hero carousel
      if (heroRef.current) {
        heroInstance =
          Carousel.getInstance(heroRef.current) ||
          new Carousel(heroRef.current, {
            interval: 4000,
            touch: true,
            pause: "hover",
          });
        // ensure it is cycling
        try { heroInstance.cycle(); } catch (e) {}
      }

      // Food carousel
      if (foodRef.current) {
        foodInstance =
          Carousel.getInstance(foodRef.current) ||
          new Carousel(foodRef.current, {
            interval: 5000,
            touch: true,
            pause: "hover",
          });
        try { foodInstance.cycle(); } catch (e) {}
      }

      // Review carousel
      if (reviewRef.current) {
        reviewInstance =
          Carousel.getInstance(reviewRef.current) ||
          new Carousel(reviewRef.current, {
            interval: 3000,
            touch: true,
            pause: "hover",
          });
        try { reviewInstance.cycle(); } catch (e) {}
      }
    } catch (err) {
      // if anything goes wrong log it for debugging
      // (no crash for the user)
      // open browser console to inspect
      // eslint-disable-next-line no-console
      console.error("Carousel initialization error:", err);
    }

    // cleanup (dispose instances on unmount)
    return () => {
      try {
        if (heroInstance) heroInstance.dispose();
        if (foodInstance) foodInstance.dispose();
        if (reviewInstance) reviewInstance.dispose();
      } catch (e) {
        // ignore cleanup errors
      }
    };
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#0b0b0b",
        color: "#fff",
        minHeight: "100vh",
        width: "100%",
        fontFamily: "'Poppins', sans-serif",
        paddingTop: "0px",
      }}
    >
      {/* Hero Section with Carousel */}
      <section
        style={{
          position: "relative",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <div
          id="heroCarousel"
          ref={heroRef}
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          data-bs-interval="3000"
          style={{ height: "100%" }}
        >
          <div className="carousel-inner" style={{ height: "100%" }}>
            {[
              "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
              "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
            ].map((img, idx) => (
              <div
                key={idx}
                className={`carousel-item ${idx === 0 ? "active" : ""}`}
                style={{ height: "100%" }}
              >
                <img
                  src={img}
                  className="d-block w-100"
                  alt="food"
                  style={{
                    height: "100vh",
                    objectFit: "cover",
                    filter: "brightness(60%)",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Hero Text Overlay */}
          <div
            className="position-absolute top-50 start-50 translate-middle text-center"
            style={{ zIndex: 10 }}
          >
            <h1
              className="display-4 fw-bold mb-3"
              style={{
                background: "linear-gradient(90deg, #ff6ec7, #00f0ff)",
                WebkitBackgroundClip: "text",
                animation: "glow 2s infinite",
              }}
            >
              Welcome to BiteBuddy 🍔
            </h1>
            <p
              className="lead mb-4"
              style={{ fontSize: "1.25rem", maxWidth: "650px", color: "#ffffff" }}
            >
              Order your favorite meals online, fast and easy. Delicious food
              delivered straight to your door.
            </p>
          </div>
        </div>
      </section>

      {/* Food Carousel Section */}
      <section className="container my-5">
        <h2
          className="text-center mb-5"
          style={{
            color: "#ffb347",
            textShadow: "2px 2px 10px #000000aa",
            fontWeight: "700",
          }}
        >
          Popular Dishes 🍕🍜🍗
        </h2>
        <div
          id="foodCarousel"
          ref={foodRef}
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="5000"
          data-bs-pause="hover"
        >
          <div className="carousel-inner">
            {[

              "/pizza.jpg", // Pizza

              "/burger.jpg", // Burger

              "/abc.jpg", // Pasta

              "/a.jpg", // Biryani

            ].map((food, idx) => (
              <div
                key={idx}
                className={`carousel-item ${idx === 0 ? "active" : ""}`}
              >
                <img
                  src={food}
                  className="d-block w-100 rounded shadow"
                  alt="popular food"
                  style={{
                    height: "500px",
                    objectFit: "cover",
                  }}
                />
              </div>
            ))}
          </div>
          {/* Controls */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#foodCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#foodCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container-fluid my-5 px-5">
        <h2
          className="text-center mb-5"
          style={{
            color: "#ffb347",
            textShadow: "2px 2px 10px #000000aa",
            fontWeight: "700",
          }}
        >
          Why Choose Us?
        </h2>

        <div className="row text-center">
          {[
            {
              title: "Fast Delivery 🚀",
              desc: "Get your orders delivered quickly and hot to your doorstep.",
              color: "#ff6f61",
            },
            {
              title: "Fresh Ingredients 🥗",
              desc: "We use only fresh and quality ingredients for every dish.",
              color: "#32cd32",
            },
            {
              title: "Easy Payment 💳",
              desc: "Multiple payment options including online and QR code.",
              color: "#1e90ff",
            },
          ].map((feature, idx) => (
            <div className="col-md-4 mb-4" key={idx}>
              <div
                className="card h-100 shadow-lg"
                style={{
                  backgroundColor: "#1f1f1f",
                  border: "none",
                  borderRadius: "20px",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow = `0 0 30px ${feature.color}80`;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 0 15px rgba(0,0,0,0.3)";
                }}
              >
                <div className="card-body">
                  <h5
                    className="card-title"
                    style={{
                      color: feature.color,
                      fontWeight: "700",
                      fontSize: "1.5rem",
                    }}
                  >
                    {feature.title}
                  </h5>
                  <p className="card-text" style={{ color: "#ffffff" }}>
                    {feature.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Reviews Carousel */}
      <section className="container my-5">
        <h2
          className="text-center mb-5"
          style={{
            color: "#ff6ec7",
            textShadow: "2px 2px 10px #000000aa",
            fontWeight: "700",
          }}
        >
          What Our Customers Say ❤️
        </h2>

        <div
          id="reviewCarousel"
          ref={reviewRef}
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="3000"
          data-bs-pause="hover"
        >
          <div className="carousel-inner">
            {[
              {

                img: "/rega.jpeg",

                text: "Amazing food quality and user-friendly app. Customer support is very helpful. I trust BiteBuddy for every order.",

                name: "- PARV SINGH ⭐⭐⭐⭐⭐",

              },
              {

                img: "/likun.jpeg",

                text: "I love the variety of dishes. Payments are hassle-free, and the packaging is great. BiteBuddy never disappoints!",

                name: "- LIKUN SAHOO ⭐⭐⭐⭐⭐",

              },
              {

                img: "/me.jpeg",

                text: "BiteBuddy is my go-to app! The delivery is super fast and the food is always fresh. Highly recommended!",

                name: "- SHUBHRANSHU DAS ⭐⭐⭐⭐⭐",

              },
            ].map((review, idx) => (
              <div
                key={idx}
                className={`carousel-item ${idx === 0 ? "active" : ""}`}
              >
                <div className="d-block w-100">
                  <div className="row align-items-center justify-content-center py-4">
                    <div className="col-md-4 text-center">
                      <img
                        src={review.img}
                        alt="customer"
                        className="img-fluid rounded-circle shadow"
                        style={{
                          width: "200px",
                          height: "200px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div className="col-md-6 text-center text-md-start">
                      <blockquote
                        style={{ fontSize: "1.2rem", fontStyle: "italic" }}
                      >
                        "{review.text}"
                      </blockquote>
                      <p className="mt-3 fw-bold">{review.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Controls */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#reviewCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#reviewCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </button>

          {/* Indicators */}
          <div className="carousel-indicators mt-3">
            {[0, 1, 2].map((idx) => (
              <button
                key={idx}
                type="button"
                data-bs-target="#reviewCarousel"
                data-bs-slide-to={idx}
                className={idx === 0 ? "active" : ""}
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="text-center py-4"
        style={{
          backgroundColor: "#f5f5f5",
          color: "#111",
          borderTop: "1px solid #ccc",
          fontSize: "0.9rem",
        }}
      >
        <p>
          &copy; 2025 BiteBuddy. All Rights Reserved. |{" "}
          <Link
            to="/ContactUs"
            style={{ color: "#ff6f61", textDecoration: "underline" }}
          >
            Contact Us
          </Link>
        </p>
      </footer>

      {/* Keyframe animation */}
      <style>
        {`
          @keyframes glow {
            0% { text-shadow: 0 0 5px #fff, 0 0 10px #ff6ec7; }
            50% { text-shadow: 0 0 20px #fff, 0 0 40px #ff00f0; }
            100% { text-shadow: 0 0 5px #fff, 0 0 10px #ff6ec7; }
          }
        `}
      </style>
    </div>
  );
}

export default Home;
`                   `
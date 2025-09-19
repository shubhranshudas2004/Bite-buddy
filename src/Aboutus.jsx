import React, { useEffect, useState, useRef } from "react";

function AboutUs() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true); // Initial fade-in
  }, []);

  // Refs for scroll animation
  const headerRef = useRef(null);
  const storyRef = useRef(null);
  const missionRef = useRef(null);
  const valuesRef = useRef(null);

  const [visibleSections, setVisibleSections] = useState({
    header: false,
    story: false,
    mission: false,
    values: false,
  });

  // Intersection Observer
  useEffect(() => {
    const options = { threshold: 0.2 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setVisibleSections((prev) => ({ ...prev, [id]: true }));
        }
      });
    }, options);

    [headerRef, storyRef, missionRef, valuesRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const values = [
    {
      title: "Quality 🍲",
      desc: "We prioritize freshness and taste above all.",
      color: "#ff6f61",
    },
    {
      title: "Trust 🤝",
      desc: "Your satisfaction is our biggest achievement.",
      color: "#32cd32",
    },
    {
      title: "Innovation 🚀",
      desc: "We keep improving to make your experience smoother.",
      color: "#ffb347",
    },
  ];

  return (
    <div
      className="about-wrapper"
      style={{
        backgroundColor: "#0b0b0b",
        color: "#fff",
        height: "100vh",
        width: "100vw",
        fontFamily: "'Poppins', sans-serif",
        display: "flex",
        flexDirection: "column",
        margin: 0,
        padding: 0,
        position: "fixed",
        top: 0,
        left: 0,
        overflowY: "auto",
      }}
    >
      <div style={{ flex: 1 }}>
        {/* Header */}
        <section
          ref={headerRef}
          id="header"
          className={`text-center py-5 ${visibleSections.header ? "fade-up" : "hidden"}`}
          style={{
            background: "linear-gradient(90deg, #ff6ec7, #00f0ff)",
            color: "#fff",
            minHeight: "20vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 className="fw-bold display-4" style={{ marginTop: "30px" }}>
            About Us 🍴
          </h1>
          <p
            className="lead"
            style={{ maxWidth: "700px", margin: "10px auto", fontSize: "1.3rem" }}
          >
            Your favorite meals delivered with love, speed, and freshness.
          </p>
        </section>

        {/* Story */}
        <section
          ref={storyRef}
          id="story"
          className={`container py-5 ${visibleSections.story ? "fade-up" : "hidden"}`}
        >
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 story-img-wrapper">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
                alt="Our Story"
                className="img-fluid rounded shadow story-img"
              />
            </div>
            <div className="col-md-6 story-text">
              <h2 className="fw-bold mb-3" style={{ color: "#ffb347" }}>
                Our Story
              </h2>
              <p style={{ lineHeight: "1.8" }}>
                BiteBuddy started with a simple mission – to make food ordering
                easier, faster, and more reliable. We believe food is not just a
                meal, it’s an experience. That’s why we partner with the best
                restaurants and chefs to bring you delicious dishes made with
                passion and love.
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section
          ref={missionRef}
          id="mission"
          className={`py-5 mission-section ${visibleSections.mission ? "fade-up" : "hidden"}`}
          style={{
            backgroundColor: "#1f1f1f",
            textAlign: "center",
            minHeight: "50vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h2 className="fw-bold mb-4" style={{ color: "#32cd32" }}>
            Our Mission 🌍
          </h2>
          <p
            style={{
              maxWidth: "700px",
              margin: "0 auto",
              fontSize: "1.1rem",
              lineHeight: "1.8",
            }}
          >
            To bring happiness to your doorstep through food. Whether it’s a
            quick snack or a full meal, we ensure that every order is delivered
            fresh, hot, and right on time. With technology and customer-first
            service, we aim to redefine food delivery one bite at a time.
          </p>
        </section>

        {/* Values */}
        <section
          ref={valuesRef}
          id="values"
          className={`container py-5 ${visibleSections.values ? "fade-up" : "hidden"}`}
        >
          <h2 className="text-center fw-bold mb-5" style={{ color: "#1e90ff" }}>
            Our Core Values 💡
          </h2>
          <div className="row text-center">
            {values.map((value, idx) => (
              <div className="col-md-4 mb-4" key={idx}>
                <div
                  className="card value-card shadow-lg"
                  style={{
                    backgroundColor: "#121212",
                    border: "none",
                    borderRadius: "18px",
                    transition: "all 0.4s ease",
                    cursor: "pointer",
                    transform: "translateY(0)",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px)";
                    e.currentTarget.style.boxShadow = `0 0 25px ${value.color}90`;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";
                  }}
                >
                  <div className="card-body">
                    <h5
                      className="fw-bold"
                      style={{ color: value.color, fontSize: "1.4rem" }}
                    >
                      {value.title}
                    </h5>
                    <p style={{ color: "#eee" }}>{value.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer
        className="text-center py-4"
        style={{
          backgroundColor: "#f5f5f5",
          color: "#111",
          borderTop: "1px solid #ccc",
          fontSize: "0.9rem",
          marginTop: "auto",
        }}
      >
        <p>© 2025 BiteBuddy. All Rights Reserved.</p>
      </footer>

      {/* CSS Animations */}
      <style>{`
        .fade-up {
          animation: fadeUp 0.8s ease forwards;
        }

        .hidden {
          opacity: 0;
          transform: translateY(30px);
        }

        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .story-img {
          transition: transform 0.5s ease, box-shadow 0.5s ease;
        }

        .story-img:hover {
          transform: scale(1.05);
          box-shadow: 0 0 25px #ffb34790;
        }

        .value-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
      `}</style>
    </div>
  );
}

export default AboutUs;

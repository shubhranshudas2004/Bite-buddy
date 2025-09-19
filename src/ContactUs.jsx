import React, { useState, useEffect, useRef } from "react";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  // Scroll animation state
  const [visibleSections, setVisibleSections] = useState({
    header: false,
    contactInfo: false,
    contactForm: false,
    map: false,
  });

  const headerRef = useRef(null);
  const contactInfoRef = useRef(null);
  const contactFormRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setVisibleSections((prev) => ({ ...prev, [id]: true }));
          }
        });
      },
      { threshold: 0.2 }
    );

    [headerRef, contactInfoRef, contactFormRef, mapRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ minHeight: "100vh", width: "100vw", margin: 0, padding: 0 }}>
      {/* Header */}
      <section
        id="header"
        ref={headerRef}
        className={visibleSections.header ? "fade-up" : "hidden"}
        style={{
          height: "40vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.3)",
            zIndex: 1,
          }}
        ></div>
        <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          <h1
            className="display-4 fw-bold"
            style={{
              marginTop: "40px",
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              fontSize: "3.5rem",
              transition: "transform 0.8s ease, opacity 0.8s ease",
            }}
          >
            📞 Contact Us
          </h1>
          <p
            className="lead"
            style={{
              fontSize: "1.5rem",
              maxWidth: "600px",
              margin: "0 auto",
              transition: "transform 0.8s ease, opacity 0.8s ease 0.2s",
            }}
          >
            We'd love to hear from you. Get in touch with our team!
          </p>
        </div>

        {/* Animated circles */}
        <div
          style={{
            position: "absolute",
            bottom: "-50px",
            left: "-50px",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
            zIndex: 1,
            animation: "pulse 6s infinite",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            top: "-70px",
            right: "-70px",
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
            zIndex: 1,
            animation: "pulse 8s infinite",
          }}
        ></div>
      </section>

      {/* Main Content */}
      <div className="container-fluid py-5" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="row justify-content-center">
          {/* Contact Info */}
          <div
            id="contactInfo"
            ref={contactInfoRef}
            className={`col-md-4 mb-5 ${visibleSections.contactInfo ? "fade-up" : "hidden"}`}
          >
            <div className="card shadow-lg border-0 h-100 hover-card">
              <div className="card-body p-4">
                <h3 className="card-title fw-bold mb-4 text-primary">Get in Touch</h3>
                <div className="d-flex align-items-start mb-4">
                  <div className="me-3 mt-1" style={{ fontSize: "1.5rem" }}>📍</div>
                  <div>
                    <h5 className="fw-bold">Address</h5>
                    <p className="text-muted">
                      123 Food Street<br />Bhubaneswar, Odisha 751024
                    </p>
                  </div>
                </div>
                <div className="d-flex align-items-start mb-4">
                  <div className="me-3 mt-1" style={{ fontSize: "1.5rem" }}>📱</div>
                  <div>
                    <h5 className="fw-bold">Phone</h5>
                    <p className="text-muted">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="d-flex align-items-start mb-4">
                  <div className="me-3 mt-1" style={{ fontSize: "1.5rem" }}>✉️</div>
                  <div>
                    <h5 className="fw-bold">Email</h5>
                    <p className="text-muted">support@foodiesapp.com</p>
                  </div>
                </div>
                <div className="d-flex align-items-start">
                  <div className="me-3 mt-1" style={{ fontSize: "1.5rem" }}>🕒</div>
                  <div>
                    <h5 className="fw-bold">Hours</h5>
                    <p className="text-muted">
                      Monday-Friday: 9am-5pm<br />Saturday: 10am-2pm
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            id="contactForm"
            ref={contactFormRef}
            className={`col-md-6 mb-5 ${visibleSections.contactForm ? "fade-up" : "hidden"}`}
          >
            <div className="card shadow-lg border-0 hover-card">
              <div className="card-body p-5">
                <h3 className="card-title fw-bold mb-4 text-center text-primary">
                  Send us a Message
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Name</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Email</label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="your@email.com"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Message</label>
                    <textarea
                      className="form-control form-control-lg"
                      rows="5"
                      placeholder="Your Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg px-5 py-2 fw-bold"
                      style={{
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        border: "none",
                        borderRadius: "50px",
                        transition: "transform 0.3s ease",
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Google Map */}
      <section
        id="map"
        ref={mapRef}
        className={visibleSections.map ? "fade-up" : "hidden"}
        style={{ padding: "5rem 0" }}
      >
        <div className="container">
          <h3 className="fw-bold mb-5 text-center text-primary">Find Us on Map</h3>
          <div className="ratio ratio-16x9 shadow-lg rounded-3 overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58963.25126377068!2d85.7706365!3d20.2702078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909ab10e6803f%3A0x7b9d8e5f95d5c3a!2sBhubaneswar%2C%20Odisha!5e0!3m2!1sen!2sin!4v1678359395841!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="map"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="text-center text-white py-5"
        style={{
          backgroundColor: "#2c3e50",
          backgroundImage: "linear-gradient(135deg, #2c3e50 0%, #3498db 100%)",
        }}
      >
        <div className="container">
          <p className="mb-2" style={{ fontSize: "1.1rem" }}>
            &copy; 2025 Foodies App. All Rights Reserved.
          </p>
          <p className="mb-0" style={{ fontSize: "1.1rem" }}>
            Built with ❤️ using React
          </p>

          <div className="mt-3">
            <a href="#" className="text-white me-3" style={{ fontSize: "1.5rem" }}>
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-white me-3" style={{ fontSize: "1.5rem" }}>
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-white me-3" style={{ fontSize: "1.5rem" }}>
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-white" style={{ fontSize: "1.5rem" }}>
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </footer>

      {/* Animations CSS */}
      <style>{`
        .fade-up {
          opacity: 1;
          transform: translateY(0);
          transition: all 0.8s ease;
        }
        .hidden {
          opacity: 0;
          transform: translateY(30px);
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.2); opacity: 0.2; }
        }
        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 0 25px rgba(0,0,0,0.2);
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
}

export default ContactUs;

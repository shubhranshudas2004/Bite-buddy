import React from "react";

function ContactUs() {
  return (
    <div style={{ height: '100vh', width: '100vw', margin: 0, padding: 0 }}>
      {/* Header Section */}
      <section
        className="text-white text-center d-flex flex-column justify-content-center align-items-center"
        style={{
          height: "30vh",
          background: "linear-gradient(to right, #4facfe, #00f2fe)",
        }}
      >
        <h1 className="display-4 fw-bold" style={{ marginTop: '40px' }}>📞 Contact Us</h1>
        <p className="lead">We’d love to hear from you. Get in touch!</p>
      </section>

      {/* Contact Form */}
      <section className="my-0" style={{ padding: '20px' }}>
        <h4 className="fw-bold mb-3 text-center">Send us a Message</h4>
        <form style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" placeholder="Your Name" />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" placeholder="your@email.com" />
          </div>
          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea className="form-control" rows="4" placeholder="Your Message"></textarea>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary px-4">
              Send Message
            </button>
          </div>
        </form>
      </section>

      {/* Google Maps */}
      <section className="my-0" style={{ padding: '20px' }}>
        <h4 className="fw-bold mb-3 text-center">Find Us on Map</h4>
        <div className="ratio ratio-16x9">
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
      </section>

      {/* Footer */}
      <footer
        className="text-center text-white py-4"
        style={{ backgroundColor: "#333", width: '100%' }}
      >
        <p>
          &copy; 2025 Foodies App. All Rights Reserved. | Built with ❤️ in React
        </p>
      </footer>
    </div>
  );
}

export default ContactUs;

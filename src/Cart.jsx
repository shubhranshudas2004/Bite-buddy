import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCart,
  removeFromCart,
  clearCart,
  placeOrder,
  updateCartQuantity,
  selectAuth,
} from "./store";
import QRCode from "react-qr-code";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import confetti from "canvas-confetti";
import emailjs from "@emailjs/browser";

// --- Custom CSS for the new design ---
// You can put this in a separate CSS file and import it.
// For this example, it's included here for simplicity.
const customStyles = `
  .cart-card {
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  }
  .cart-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  }
  .qr-card {
    background: linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%);
    position: relative;
    overflow: hidden;
  }
  .qr-card::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.2) 10%, transparent 70%);
    transform: rotate(45deg);
    animation: pulse 5s infinite;
    z-index: 0;
  }
  @keyframes pulse {
    0% { transform: scale(1) rotate(45deg); opacity: 0.5; }
    50% { transform: scale(1.2) rotate(45deg); opacity: 1; }
    100% { transform: scale(1) rotate(45deg); opacity: 0.5; }
  }
  .qr-content {
    position: relative;
    z-index: 1;
  }
  .price-summary-card {
    border-left: 5px solid #28a745;
  }
`;

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCart);
  const auth = useSelector(selectAuth);

  // 🔊 Audio refs
  const successSoundRef = useRef(null);
  const errorSoundRef = useRef(null);

  // State
  const [discountPercent, setDiscountPercent] = useState(0);
  const [flatDiscount, setFlatDiscount] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(0);

  const [customerName, setCustomerName] = useState("");
  const [customerMobile, setCustomerMobile] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  // ⏱️ QR Timer
  const [timeLeft, setTimeLeft] = useState(300); // 5 min in seconds

  useEffect(() => {
    if (paymentMethod === "qr") {
      setTimeLeft(300); // reset timer each time QR selected
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setPaymentMethod(""); // ⛔ auto-reset payment method
            Swal.fire({
              icon: "error",
              title: "⏳ Request Timed Out",
              text: "Your QR session expired. Redirecting to Cart...",
              timer: 3000,
              showConfirmButton: false,
            }).then(() => {
              navigate("/cart"); // redirect to Cart
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [paymentMethod, navigate]);

  // 🕒 Format time MM:SS
  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  // Handle Quantity
  const handleQuantityChange = (id, delta) => {
    dispatch(updateCartQuantity({ id, delta }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  // Discounts
  const handleDiscount = (percent) => {
    setDiscountPercent(percent);
    setFlatDiscount(0);
  };

  const handleCoupon = () => {
    let applied = false;
    if (coupon === "SAVE50") {
      setDiscountPercent(50);
      setFlatDiscount(0);
      applied = true;
    } else if (coupon === "FLAT100") {
      setDiscountPercent(0);
      setFlatDiscount(100);
      applied = true;
    }

    if (applied) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
      if (successSoundRef.current) successSoundRef.current.play();
      Swal.fire("Success!", "Coupon applied successfully!", "success");
    } else {
      Swal.fire("Invalid Coupon", "Please enter a valid coupon code!", "error");
      if (errorSoundRef.current) errorSoundRef.current.play();
    }
  };

  // 🟢 Price calculations
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = totalPrice < 199 ? 50 : 0;
  const taxRate = 0.05;
  const discountAmount =
    (totalPrice * discountPercent) / 100 + flatDiscount;

  const subtotalAfterDiscount = Math.max(totalPrice - discountAmount, 0);
  const taxAmount = subtotalAfterDiscount * taxRate;
  const finalPrice = subtotalAfterDiscount + taxAmount + shipping;

  // Place Order
  const handlePlaceOrder = () => {
    if (!auth.isLoggedIn) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "You must be logged in to place an order.",
        confirmButtonText: "Login Now",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      if (errorSoundRef.current) errorSoundRef.current.play();
      return;
    }

    if (cartItems.length === 0) return;
    if (!customerName || !customerMobile || !customerEmail) {
      Swal.fire("Missing Info", "Please enter all customer details!", "warning");
      if (errorSoundRef.current) errorSoundRef.current.play();
      return;
    }

    Swal.fire({
      title: "Confirm Your Order",
      text: `Final Amount: ₹${finalPrice.toFixed(2)}\nProceed with order?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Place Order ✅",
      cancelButtonText: "Cancel ❌",
    }).then((result) => {
      if (result.isConfirmed) {
        // ✅ Generate consistent orderId
        const orderId = `ORD-${Date.now()}`;
        const orderDate = new Date().toLocaleString();

        // Save in Redux
        dispatch(
          placeOrder({
            discountedPrice: finalPrice,
            items: cartItems,
            id: orderId, // ✅ same ID everywhere
            date: orderDate,
          })
        );
        dispatch(clearCart());
        setOrderSuccess(true);
        setRedirectCountdown(3);

        // 🔊 Play success sound
        if (successSoundRef.current) successSoundRef.current.play();

        // EmailJS + Confetti
        const templateParams = {
          email: customerEmail,
          order_id: orderId, // ✅ same ID in email
          orders: cartItems.map((item) => ({
            name: item.name,
            image_url: item.image,
            price: item.price * item.quantity,
            units: item.quantity,
          })),
          cost: {
            discount: discountAmount.toFixed(2),
            afterdiscount: subtotalAfterDiscount.toFixed(2),
            shipping: shipping,
            tax: taxAmount.toFixed(2),
            total: finalPrice.toFixed(2),
          },
        };

        const serviceId = "service_o6s7wtx";
        const templateId = "template_609cd63";
        const publicKey = "vvyAnY41Sbxp7tgKS";

        emailjs
          .send(serviceId, templateId, templateParams, publicKey)
          .then((response) => {
            console.log(
              "Email sent successfully!",
              response.status,
              response.text
            );
          })
          .catch((error) => {
            console.error("Failed to send email:", error);
          });

        // 🎉 Confetti + redirect countdown
        confetti({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.6 },
        });

        const countdownInterval = setInterval(() => {
          setRedirectCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(countdownInterval);
              setOrderSuccess(false);
              navigate("/orders");
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    });
  };

  return (
    <div className="container-fluid" style={{ marginTop: "80px" }}>
      {/* Add custom styles here */}
      <style>{customStyles}</style>

      {/* 🔊 Hidden audio elements */}
      <audio ref={successSoundRef} src="/success.mp3" preload="auto" />
      <audio ref={errorSoundRef} src="/error.mp3" preload="auto" />

      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}

      {/* Heading */}
      <h1 className="mb-4 text-center fw-bold" style={{ color: "#1e90ff" }}>
        🛒 Your Cart
      </h1>

      {/* ✅ Success Message with countdown */}
      {orderSuccess && (
        <div className="alert alert-success text-center shadow-sm fw-semibold">
          ✅ Order Successful! Redirecting to <b>Orders section</b> in{" "}
          {redirectCountdown}...
        </div>
      )}

      <div className="row">
        {cartItems.length === 0 ? (
          <p className="text-muted text-center">Your cart is empty</p>
        ) : (
          <>
            <div className="col-lg-8">
              {/* Cart Items */}
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="card mb-3 p-3 d-flex flex-row align-items-center cart-card"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "150px",
                      marginRight: "20px",
                      borderRadius: "10px",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                    }}
                  />
                  <div className="flex-grow-1">
                    <strong style={{ color: "#343a40", fontSize: "1.25rem" }}>
                      {item.name}
                    </strong>{" "}
                    <span
                      className="text-primary fw-bold"
                      style={{ fontSize: "1.1rem" }}
                    >
                      ₹{item.price.toFixed(2)}
                    </span>
                    <div className="mt-3">
                      <span className="fw-semibold">Quantity:</span>
                      <button
                        className="btn btn-sm btn-outline-danger mx-1"
                        onClick={() => handleQuantityChange(item.id, -1)}
                      >
                        -
                      </button>
                      <span
                        className="px-3 fw-bold"
                        style={{ fontSize: "1.1rem" }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        className="btn btn-sm btn-outline-success mx-1"
                        onClick={() => handleQuantityChange(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="btn btn-outline-danger fw-semibold"
                    onClick={() => handleRemove(item.id)}
                    style={{ fontSize: "1.1rem" }}
                  >
                    ❌ Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="col-lg-4">
              {/* Customer Details */}
              <div
                className="card p-4 mb-3 cart-card"
                style={{ backgroundColor: "#e9f7ef" }}
              >
                <h5 className="fw-bold text-success">👤 Customer Details</h5>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="form-control mb-3 border-success"
                />
                <input
                  type="text"
                  placeholder="Mobile Number"
                  value={customerMobile}
                  onChange={(e) => setCustomerMobile(e.target.value)}
                  className="form-control mb-3 border-success"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="form-control mb-3 border-success"
                />
              </div>

              {/* Discount Section */}
              <div
                className="card p-4 mb-3 cart-card"
                style={{ backgroundColor: "#fff3cd" }}
              >
                <h5 className="fw-bold text-warning">💸 Apply Discount</h5>
                <div>
                  <button
                    className="btn btn-sm btn-outline-warning mx-1 fw-semibold"
                    onClick={() => handleDiscount(10)}
                  >
                    10% OFF
                  </button>
                  <button
                    className="btn btn-sm btn-outline-warning mx-1 fw-semibold"
                    onClick={() => handleDiscount(20)}
                  >
                    20% OFF
                  </button>
                  <button
                    className="btn btn-sm btn-outline-warning mx-1 fw-semibold"
                    onClick={() => handleDiscount(30)}
                  >
                    30% OFF
                  </button>
                </div>
              </div>

              {/* Coupon Section */}
              <div
                className="card p-4 mb-3 cart-card"
                style={{ backgroundColor: "#e8f0fe" }}
              >
                <h5 className="fw-bold text-primary">🏷️ Apply Coupon</h5>
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="form-control border-primary"
                  />
                  <button
                    className="btn btn-primary fw-semibold"
                    onClick={handleCoupon}
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Price Summary */}
              <div
                className="card p-4 mb-3 cart-card price-summary-card bg-light"
              >
                <h5 className="fw-bold text-dark">💰 Price Summary</h5>
                <p>Total Price: ₹{totalPrice.toFixed(2)}</p>
                {discountPercent > 0 && (
                  <p className="text-success">
                    Discount Applied: {discountPercent}% (₹
                    {((totalPrice * discountPercent) / 100).toFixed(2)})
                  </p>
                )}
                {flatDiscount > 0 && (
                  <p className="text-success">Flat Discount: ₹{flatDiscount}</p>
                )}
                <p>
                  Subtotal After Discount: ₹{subtotalAfterDiscount.toFixed(2)}
                </p>
                <p>Tax (5%): ₹{taxAmount.toFixed(2)}</p>
                <p>Shipping: ₹{shipping.toFixed(2)}</p>
                <h4 className="fw-bold text-dark">
                  Final Payable:{" "}
                  <span className="text-success">
                    ₹{finalPrice.toFixed(2)}
                  </span>
                </h4>
              </div>

              {/* Payment Method */}
              <div className="card p-4 mb-3 cart-card">
                <h5 className="fw-bold text-dark">💳 Select Payment Method</h5>
                <div className="d-flex justify-content-around">
                  <button
                    className={`btn fw-semibold ${
                      paymentMethod === "qr" ? "btn-success" : "btn-outline-dark"
                    }`}
                    onClick={() => setPaymentMethod("qr")}
                  >
                    QR Code
                  </button>
                  <button
                    className={`btn fw-semibold ${
                      paymentMethod === "card" ? "btn-success" : "btn-outline-dark"
                    }`}
                    onClick={() => setPaymentMethod("card")}
                  >
                    Card
                  </button>
                </div>
              </div>

              {/* QR Code Payment */}
              {paymentMethod === "qr" && (
                <div
                  className="card p-4 mb-3 text-center cart-card qr-card"
                >
                  <div className="qr-content">
                    {timeLeft > 0 ? (
                      <>
                        <h5 className="mb-3 fw-bold text-success">📲 Scan & Pay</h5>
                        <p className="text-muted">Pay securely using UPI</p>
                        <div className="d-flex justify-content-center my-3">
                          <QRCode
                            value={`upi://pay?pa=7205744485@ptaxis&pn=Bite-Buddy &tn=Payment for order&am=${finalPrice.toFixed(
                              2
                            )}&cu=INR`}
                            size={220}
                            level="H"
                            includeMargin={true}
                          />
                        </div>
                        <h5 className="text-dark">
                          Amount:{" "}
                          <span className="text-success fw-bold">
                            ₹{finalPrice.toFixed(2)}
                          </span>
                        </h5>
                        <p className="mt-2">
                          UPI ID:{" "}
                          <strong className="text-primary">
                            7205744485@ptaxis
                          </strong>
                        </p>
                        <div className="fw-bold text-danger mt-3">
                          ⏳ Time Left: {formatTime(timeLeft)}
                        </div>
                      </>
                    ) : (
                      <div className="alert alert-danger fw-bold">
                        ❌ Request Timed Out! Please try again.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Card Payment */}
              {paymentMethod === "card" && (
                <div
                  className="card p-4 mb-3 cart-card"
                  style={{ backgroundColor: "#fff0f6" }}
                >
                  <h5 className="mb-3 fw-bold text-danger">
                    💳 Enter Card Details
                  </h5>
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="form-control mb-2 border-danger"
                  />
                  <div className="d-flex">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="form-control me-2 border-danger"
                    />
                    <input
                      type="password"
                      placeholder="CVV"
                      className="form-control border-danger"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Cardholder Name"
                    className="form-control mt-2 border-danger"
                  />
                </div>
              )}

              {/* Place Order */}
              <button
                className="btn btn-success btn-lg w-100 fw-bold cart-card"
                onClick={handlePlaceOrder}
              >
                ✅ Place Your Order
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
import { useSelector } from "react-redux";
import { selectOrders } from "./store"; // use the selector from store

function Orders() {
  const orders = useSelector(selectOrders);
  console.log(orders);

  return (
    <div className="container flex-grow-1 my-5 py-4">
      {/* Page Heading */}
      <h1
        className="fw-bold text-center mb-4"
        style={{
          color: "#1e90ff",
          textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
          
        }}
      >
        📦 Your Orders
      </h1>

      {orders.length === 0 ? (
        <div
          className="text-center p-5 rounded shadow-sm"
          style={{ backgroundColor: "#f8f9fa", border: "2px dashed #1e90ff" }}
        >
          <h4 className="text-muted">No orders yet 🙁</h4>
          <p className="text-muted">
            Start adding items to your cart and place an order!
          </p>
        </div>
      ) : (
        <div className="row justify-content-center">
          {orders.map((order) => {
            // Calculate values
            const subtotal = order.items.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            );

            const shipping = subtotal < 199 ? 50 : 0;
            let subtotalAfterDiscount, tax, discount, finalTotal;

            if (order.discountedPrice - shipping <= 0) {
              subtotalAfterDiscount = 0;
              tax = 0;
              discount = subtotal;
              finalTotal = shipping;
            } else {
              subtotalAfterDiscount = (order.discountedPrice - shipping) / 1.05;
              tax = subtotalAfterDiscount * 0.05;
              discount = subtotal - subtotalAfterDiscount;
              finalTotal = order.discountedPrice;
            }

            return (
              <div
                key={order.id}
                className={orders.length === 1 ? "col-12 mb-4" : "col-md-6 mb-4"}
              >
                <div
                  className="card shadow-lg border-0 h-100"
                  style={{
                    borderRadius: "15px",
                    overflow: "hidden",
                    background:
                      "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
                  }}
                >
                  {/* Card Header */}
                  <div
                    className="card-header fw-bold"
                    style={{
                      background: "linear-gradient(90deg, #1e90ff, #00bfff)",
                      color: "white",
                      fontSize: "1.1rem",
                    }}
                  >
                    🛍️ Order #{order.id}
                  </div>

                  {/* Card Body */}
                  <div className="card-body">
                    <p className="text-muted mb-3">
                      📅 Date:{" "}
                      <span className="fw-semibold text-dark">{order.date}</span>
                    </p>

                    {/* Items */}
                    <ul className="list-group mb-3">
                      {order.items.map((item) => (
                        <li
                          key={item.id}
                          className="list-group-item d-flex justify-content-between align-items-center"
                          style={{
                            border: "none",
                            borderBottom: "1px solid #e9ecef",
                            backgroundColor: "#fdfdfd",
                          }}
                        >
                          <span>
                            <span className="fw-semibold text-dark">
                              {item.name}
                            </span>{" "}
                            <span className="badge bg-secondary ms-2">
                              x{item.quantity}
                            </span>
                          </span>
                          <span className="fw-bold text-success">
                            ₹{item.price * item.quantity}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Price Breakdown */}
                    {discount > 0 && (
                      <p className="text-success text-end fw-semibold">
                        🎉 Discount: -₹{discount.toFixed(2)}
                      </p>
                    )}

                    <p className="fw-semibold text-dark text-end">
                      Subtotal After Discount: ₹
                      {(subtotal - discount).toFixed(2)}
                    </p>
                    <p className="text-danger text-end fw-semibold">
                      + Tax (5%): ₹{tax.toFixed(2)}
                    </p>
                    <p className="text-warning text-end fw-semibold">
                      + Shipping: ₹{shipping.toFixed(2)}
                    </p>

                    {/* Final Total */}
                    <p
                      className="fw-bold fs-5 text-end"
                      style={{ color: "#dc3545" }}
                    >
                      Final Total:{" "}
                      <span className="fw-bold">₹{finalTotal.toFixed(2)}</span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Orders;

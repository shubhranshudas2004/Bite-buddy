import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectVegProducts, addToCart, updateCartQuantity, selectCart } from "./store";
import "./Veg.css";
import { toast } from "react-toastify";

function Veg() {
  const dispatch = useDispatch();
  const vegProducts = useSelector(selectVegProducts);
  const cart = useSelector(selectCart);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = vegProducts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(vegProducts.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`✅ ${product.name} added to cart!`);
  };

  const handleIncrement = (productId) => {
    dispatch(updateCartQuantity({ id: productId, delta: 1 }));
  };

  const handleDecrement = (productId) => {
    dispatch(updateCartQuantity({ id: productId, delta: -1 }));
  };

  const getProductQuantity = (productId) => {
    const item = cart.find(p => p.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <div style={{ minHeight: "100vh", background: "transparent" }}>
      {/* Page Heading */}
      <h1
        style={{
          color: "#2e7d32",
          textAlign: "center",
          margin: "70px 0 32px 0",
          fontWeight: 800,
          letterSpacing: "1px",
          fontSize: "2.8rem",
          textShadow: "0 2px 8px #e8f5e9",
        }}
      >
        🥗 Veg Menu
      </h1>

      {/* Wrapper */}
      <div className="veg-container-wrapper">
        {/* Product Grid */}
        <div className="veg-container">
          <div className="row g-4">
          {currentItems.map((product) => (
            <div
              key={product.id}
              className="col-lg-3 col-md-4 col-sm-6 col-12 d-flex"
            >
              <div className="card product-card flex-fill">
                <div className="img-wrapper">
                  <img
                    src={product.image}
                    className="card-img-top product-img"
                    alt={product.name}
                  />
                </div>
                <div className="card-body text-center">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text fw-semibold fs-5">
                    ₹{product.price}
                  </p>
                  <p className="food-description">{product.description}</p>
                  {getProductQuantity(product.id) > 0 ? (
                    <div className="quantity-controls d-flex align-items-center justify-content-center">
                      <button
                        className="btn quantity-btn decrement-btn"
                        onClick={() => handleDecrement(product.id)}
                      >
                        ➖
                      </button>
                      <span className="quantity-display fw-bold mx-2">
                        {getProductQuantity(product.id)}
                      </span>
                      <button
                        className="btn quantity-btn increment-btn"
                        onClick={() => handleIncrement(product.id)}
                      >
                        ➕
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn w-100 fw-bold add-btn"
                      onClick={() => handleAddToCart(product)}
                    >
                      🛒 Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>

        {/* Pagination */}
        <nav className="mt-5" aria-label="Veg menu pagination">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => paginate(currentPage - 1)}
                aria-label="Previous page"
              >
                ⬅ Prev
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li
                key={i + 1}
                className={`page-item ${
                  currentPage === i + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(i + 1)}
                  aria-label={`Page ${i + 1}`}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => paginate(currentPage + 1)}
                aria-label="Next page"
              >
                Next ➡
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Veg;

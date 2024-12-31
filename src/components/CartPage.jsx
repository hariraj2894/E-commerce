import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const carts = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(carts);

    const wishes = JSON.parse(localStorage.getItem("wish")) || [];
    setWishlist(wishes);
  }, []);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedCart = cart.map((item) =>
      item._id === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemoveItem = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemoveFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((item) => item._id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wish", JSON.stringify(updatedWishlist));
  };

  const handleAddMoreProducts = () => {
    navigate("/productsList");
  };

  const proceedToBuy = () => {
    const totalPrice = calculateTotal();
    navigate("/payment", { state: { cart, totalPrice } }); // Pass cart and totalPrice to PaymentPage
  };

  if (cart.length === 0 && wishlist.length === 0) {
    return <div style={styles.emptyCartMessage}>Your cart and wishlist are empty.</div>;
  }

  return (
    <div style={styles.cartContainer}>
      <h1 style={styles.heading}>Your Shopping Cart</h1>
      {cart.length > 0 ? (
        <div style={styles.cartItems}>
          {cart.map((item) => (
            <div key={item._id} style={styles.cartItem}>
              <img src={item.image} alt={item.name} style={styles.cartImage} />
              <div style={styles.cartDetails}>
                <p style={styles.cartItemName}>{item.name}</p>
                <p style={styles.cartItemArtisan}>
                  Artisan: {item.artisanId ? item.artisanId.name : "Unknown"}
                </p>
                <p style={styles.cartItemPrice}>₹{item.price}</p>
                <div style={styles.quantity}>
                  <label htmlFor={`quantity-${item._id}`} style={styles.label}>
                    Quantity:
                  </label>
                  <input
                    type="number"
                    id={`quantity-${item._id}`}
                    value={item.quantity}
                    min="1"
                    onChange={(e) =>
                      handleQuantityChange(item._id, Number(e.target.value))
                    }
                    style={styles.input}
                  />
                </div>
                <p style={styles.cartItemTotal}>
                  Total: ₹{item.price * item.quantity}
                </p>
              </div>
              <button
                onClick={() => handleRemoveItem(item._id)}
                style={styles.removeButton}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}

      <div style={styles.cartSummary}>
        <h2 style={styles.summaryHeading}>Cart Summary</h2>
        <p style={styles.summaryText}>
          Total Price: ₹{calculateTotal()}
        </p>
        <button style={styles.checkoutBtn} onClick={proceedToBuy}>
          Proceed to Buy
        </button>
        <button style={styles.checkoutBtn} onClick={handleAddMoreProducts}>
          Add More Products
        </button>
      </div>

      <h1 style={styles.heading}>Your Wishlist</h1>
      {wishlist.length > 0 ? (
        <div style={styles.cartItems}>
          {wishlist.map((item) => (
            <div key={item._id} style={styles.cartItem}>
              <img src={item.image} alt={item.name} style={styles.cartImage} />
              <div style={styles.cartDetails}>
                <p style={styles.cartItemName}>{item.name}</p>
                <p style={styles.cartItemArtisan}>
                  Artisan: {item.artisanId ? item.artisanId.name : "Unknown"}
                </p>
                <p style={styles.cartItemPrice}>₹{item.price}</p>
              </div>
              <button style={styles.checkoutBtn} onClick={proceedToBuy}>
          Proceed to Buy
        </button>
        <button style={styles.checkoutBtn} onClick={handleAddMoreProducts}>
          Add More Wishlists
        </button>
              <button
                onClick={() => handleRemoveFromWishlist(item._id)}
                style={styles.removeButton}
              >
                Remove from Wishlist
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Your wishlist is empty.</p>
      )}
    </div>
  );
};




const styles = {
  cartContainer: {
    padding: "20px",
    backgroundColor: "#f0f4f8",
    borderRadius: "12px",
    maxWidth: "900px",
    margin: "0 auto",
    marginTop: "70px",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.15)",
    fontFamily: "'Roboto', sans-serif",
  },
  heading: {
    textAlign: "center",
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "20px",
    color: "#333",
  },
  cartItems: {
    display: "flex",
    flexDirection: "column",
    gap: "25px",
  },
  cartItem: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  cartItemHover: {
    transform: "scale(1.02)",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
  },
  cartImage: {
    width: "120px",
    height: "120px",
    objectFit: "cover",
    borderRadius: "12px",
    marginRight: "20px",
  },
  cartDetails: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  cartItemName: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#222",
  },
  cartItemArtisan: {
    fontSize: "16px",
    color: "#555",
  },
  cartItemPrice: {
    fontSize: "18px",
    fontWeight: "500",
    color: "#007bff",
  },
  quantity: {
    display: "flex",
    alignItems: "center",
  },
  label: {
    fontSize: "16px",
    marginRight: "10px",
    fontWeight: "500",
    color: "#333",
  },
  input: {
    padding: "6px 12px",
    fontSize: "16px",
    width: "60px",
    textAlign: "center",
    border: "1px solid #ddd",
    borderRadius: "6px",
  },
  cartItemTotal: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#333",
  },
  removeButton: {
    backgroundColor: "#ff4d4d",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  removeButtonHover: {
    backgroundColor: "#d42f2f",
  },
  cartSummary: {
    marginTop: "30px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  summaryHeading: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#333",
  },
  summaryText: {
    fontSize: "18px",
    marginTop: "15px",
    color: "#555",
  },
  checkoutBtn: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "12px 30px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "600",
    marginTop: "20px",
    transition: "background-color 0.3s",
    marginRight: "10px",
    height: "70px",
  },
  checkoutBtnHover: {
    backgroundColor: "#218838",
  },
  emptyCartMessage: {
    textAlign: "center",
    fontSize: "22px",
    fontWeight: "600",
    marginTop: "50px",
    color: "#777",
  },
};


export default CartPage;

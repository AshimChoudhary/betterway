import React from "react";
import { useCart } from "../context/CartContext";
import { useStock } from "../context/StockContext";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    getCartTotal,
    completePurchase,
  } = useCart();

  const { updateStock } = useStock();
  const navigate = useNavigate();

  const handleBuyNow = () => {
    completePurchase(updateStock);
    navigate("/");
  };

  if (cart.items.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <Link to="/" className="cart-empty-link">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>

      <div className="cart-items">
        {cart.items.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.img} alt={item.title} className="cart-item-img" />

            <div className="cart-item-details">
              <h3 className="cart-item-title">{item.title}</h3>
              <p className="cart-item-price">${item.price}</p>
            </div>

            <div className="cart-item-quantity">
              <button
                onClick={() => decrementQuantity(item.id)}
                className="cart-quantity-btn"
              >
                -
              </button>
              <span className="cart-quantity-value">{item.quantity}</span>
              <button
                onClick={() => incrementQuantity(item.id, item.stock)}
                className="cart-quantity-btn"
              >
                +
              </button>
            </div>

            <p className="cart-item-total">
              ${(item.price * item.quantity).toFixed(2)}
            </p>

            <button
              onClick={() => removeFromCart(item.id)}
              className="cart-remove-btn"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3 className="cart-total">
          <span>Total:</span>
          <span>${getCartTotal().toFixed(2)}</span>
        </h3>

        <div className="cart-actions">
          <button onClick={clearCart} className="cart-clear-btn">
            Clear Cart
          </button>

          <button onClick={handleBuyNow} className="cart-continue-btn">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

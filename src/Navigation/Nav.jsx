import "./Nav.css";
import React from "react";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { AiOutlineShoppingCart, AiOutlineUserAdd } from "react-icons/ai";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";

const Nav = ({ query, handleInputChange }) => {
  const { getCartCount } = useCart();
  const { getFavoritesCount } = useFavorites();
  const cartCount = getCartCount();
  const favoritesCount = getFavoritesCount();

  return (
    <nav>
      <div className="nav-container">
        <input
          type="text"
          placeholder="Enter Your product name"
          className="search-input"
          value={query}
          onChange={handleInputChange}
        />
      </div>

      <div className="profile-container">
        <Link to="/favorites" className="cart-link">
          <FiHeart className="nav-icons" />
          {favoritesCount > 0 && (
            <span className="cart-badge">{favoritesCount}</span>
          )}
        </Link>

        <Link to="/cart" className="cart-link">
          <AiOutlineShoppingCart className="nav-icons" />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>

        <a href="">
          <AiOutlineUserAdd className="nav-icons" />
        </a>
      </div>
    </nav>
  );
};

export default Nav;

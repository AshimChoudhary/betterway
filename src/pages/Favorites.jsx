import React from "react";
import { useFavorites } from "../context/FavoritesContext";
import { Link } from "react-router-dom";
import "./Favorites.css";

const Favorites = () => {
  const { favorites, removeFromFavorites, clearFavorites } = useFavorites();

  if (favorites.items.length === 0) {
    return (
      <div className="favorites-empty">
        <h2>Your favorites list is empty</h2>
        <Link to="/" className="favorites-empty-link">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <h2>My Favorites</h2>

      <div className="favorites-items">
        {favorites.items.map((item) => (
          <div key={item.id} className="favorites-item">
            <img
              src={item.img}
              alt={item.title}
              className="favorites-item-img"
            />

            <div className="favorites-item-details">
              <h3 className="favorites-item-title">{item.title}</h3>
              <p className="favorites-item-price">${item.price}</p>
            </div>

            <button
              onClick={() => removeFromFavorites(item.id)}
              className="favorites-remove-btn"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="favorites-actions">
        <button onClick={clearFavorites} className="favorites-clear-btn">
          Clear All Favorites
        </button>

        <Link to="/">
          <button className="favorites-continue-btn">Continue Shopping</button>
        </Link>
      </div>
    </div>
  );
};

export default Favorites;

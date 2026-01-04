import React from "react";
import { AiFillStar, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";

const Card = ({
  id,
  img,
  title,
  reviews,
  prevPrice,
  newPrice,
  stock,
  onStockUpdate,
}) => {
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const handleAddToCart = () => {
    if (stock > 0) {
      addToCart(
        {
          id,
          img,
          title,
          price: newPrice,
        },
        stock
      );
      onStockUpdate(id);
    }
  };

  const handleToggleFavorite = () => {
    if (isFavorite(id)) {
      removeFromFavorites(id);
    } else {
      addToFavorites({
        id,
        img,
        title,
        price: newPrice,
      });
    }
  };

  const isOutOfStock = stock === 0;
  const favorited = isFavorite(id);

  return (
    <section className="card">
      <div className="card-image-container">
        <img src={img} alt={title} className="card-img" />
        <button
          className="favorite-icon-btn"
          onClick={handleToggleFavorite}
          aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
        >
          {favorited ? (
            <AiFillHeart className="favorite-icon favorited" />
          ) : (
            <AiOutlineHeart className="favorite-icon" />
          )}
        </button>
      </div>
      <div className="card-details">
        <h3 className="card-title">{title}</h3>
        <section className="card-reviews">
          <AiFillStar className="rating-star" />
          <AiFillStar className="rating-star" />
          <AiFillStar className="rating-star" />
          <AiFillStar className="rating-star" />
          <span className="total-reviews">{reviews}</span>
        </section>
        <section className="card-price">
          <div className="price">
            <del>{prevPrice}</del> ${newPrice}
          </div>
        </section>
        {isOutOfStock && (
          <p className="stock-status out-of-stock">Out of Stock</p>
        )}
        {!isOutOfStock && (
          <>
            <p className="stock-status in-stock">In Stock</p>
            <p className="stock-count">Stock: {stock}</p>
          </>
        )}
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="add-to-cart-button"
        >
          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </section>
  );
};

export default Card;

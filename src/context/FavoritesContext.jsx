import React, { createContext, useContext, useReducer } from "react";

const FavoritesContext = createContext();

const favoritesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_FAVORITES": {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        return state;
      }
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }

    case "REMOVE_FROM_FAVORITES": {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    }

    case "CLEAR_FAVORITES": {
      return {
        ...state,
        items: [],
      };
    }

    default:
      return state;
  }
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, dispatch] = useReducer(favoritesReducer, { items: [] });

  const addToFavorites = (product) => {
    dispatch({ type: "ADD_TO_FAVORITES", payload: product });
  };

  const removeFromFavorites = (id) => {
    dispatch({ type: "REMOVE_FROM_FAVORITES", payload: id });
  };

  const clearFavorites = () => {
    dispatch({ type: "CLEAR_FAVORITES" });
  };

  const isFavorite = (id) => {
    return favorites.items.some((item) => item.id === id);
  };

  const getFavoritesCount = () => {
    return favorites.items.length;
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        clearFavorites,
        isFavorite,
        getFavoritesCount,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
};

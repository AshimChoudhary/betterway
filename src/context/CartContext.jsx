import React, { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { product, stock } = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (stock === 0) {
        return state;
      }

      if (existingItem) {
        if (existingItem.quantity >= stock) {
          return state;
        }
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { ...product, quantity: 1 }],
      };
    }

    case "REMOVE_FROM_CART": {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    }

    case "INCREMENT_QUANTITY": {
      const { id, stock } = action.payload;
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === id) {
            if (item.quantity >= stock) {
              return item;
            }
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        }),
      };
    }

    case "DECREMENT_QUANTITY": {
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.payload) {
            if (item.quantity <= 1) {
              return item;
            }
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        }),
      };
    }

    case "CLEAR_CART": {
      return {
        ...state,
        items: [],
      };
    }

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  const addToCart = (product, stock) => {
    dispatch({ type: "ADD_TO_CART", payload: { product, stock } });
  };

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const incrementQuantity = (id, stock) => {
    dispatch({ type: "INCREMENT_QUANTITY", payload: { id, stock } });
  };

  const decrementQuantity = (id) => {
    dispatch({ type: "DECREMENT_QUANTITY", payload: id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const completePurchase = (onStockUpdate) => {
    cart.items.forEach((item) => {
      if (onStockUpdate) {
        onStockUpdate(item.id, item.quantity);
      }
    });

    clearCart();
  };

  const getCartTotal = () => {
    return cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getCartCount = () => {
    return cart.items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        clearCart,
        completePurchase,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

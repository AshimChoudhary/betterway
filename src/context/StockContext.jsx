import React, { createContext, useContext, useState, useCallback } from "react";

const StockContext = createContext();

export const StockProvider = ({ children }) => {
  const [productStocks, setProductStocks] = useState({});

  const initializeStocks = useCallback((stockMap) => {
    setProductStocks(stockMap);
  }, []);

  const updateStock = useCallback((productId, quantity = 1) => {
    setProductStocks((prev) => ({
      ...prev,
      [productId]: Math.max(0, prev[productId] - quantity),
    }));
  }, []);

  const getStock = useCallback(
    (productId) => {
      return productStocks[productId] || 0;
    },
    [productStocks]
  );

  return (
    <StockContext.Provider
      value={{
        productStocks,
        initializeStocks,
        updateStock,
        getStock,
      }}
    >
      {children}
    </StockContext.Provider>
  );
};

export const useStock = () => {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error("useStock must be used within StockProvider");
  }
  return context;
};

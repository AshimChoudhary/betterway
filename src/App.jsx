import { useState, useEffect, useMemo, useCallback } from "react";
import Nav from "./Navigation/Nav";
import Products from "./Products/Products";
import Recommended from "./Recomended/Recommended";
import Sidebar from "./Sidebar/Sidebar";
import "./index.css";

import Card from "./Components/Card";
import { useStock } from "./context/StockContext";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [storeQuery, setStoreQuery] = useState(null);
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const { productStocks, initializeStocks, updateStock } = useStock();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();

        const mappedProducts = data.products.map((product) => ({
          id: product.id,
          img: product.thumbnail,
          title: product.title,
          reviews: `(${product.reviews?.length || 0} reviews)`,
          prevPrice: `$${(product.price * 1.3).toFixed(2)}`,
          newPrice: product.price,
          company: product.brand,
          color: product.tags?.[0] || "black",
          category: product.category,
          stock: product.stock,
          description: product.description,
          rating: product.rating,
          images: product.images,
        }));

        setProducts(mappedProducts);

        const stockMap = {};
        mappedProducts.forEach((product) => {
          stockMap[product.id] = product.stock;
        });
        initializeStocks(stockMap);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [initializeStocks]);

  const handleStockUpdate = useCallback(
    (productId) => {
      updateStock(productId, 1);
    },
    [updateStock]
  );

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleChange = (e) => {
    setStoreQuery(e.target.value);
  };

  const handleButton = (e) => {
    setStoreQuery(e.target.value);
  };

  const handleClearFilters = () => {
    setQuery("");
    setStoreQuery(null);
    setSortOrder("");
  };

  const handleSort = (e) => {
    setSortOrder(e.target.value);
  };

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (query) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    }

    if (storeQuery) {
      filtered = filtered.filter(({ category }) => {
        return category === storeQuery;
      });
    }

    if (sortOrder === "lowToHigh") {
      filtered = [...filtered].sort((a, b) => a.newPrice - b.newPrice);
    } else if (sortOrder === "highToLow") {
      filtered = [...filtered].sort((a, b) => b.newPrice - a.newPrice);
    }

    return filtered;
  }, [products, query, storeQuery, sortOrder]);

  const result = useMemo(() => {
    return filteredProducts.map((product) => (
      <Card
        key={product.id}
        id={product.id}
        img={product.img}
        title={product.title}
        reviews={product.reviews}
        prevPrice={product.prevPrice}
        newPrice={product.newPrice}
        stock={productStocks[product.id] || 0}
        onStockUpdate={handleStockUpdate}
      />
    ));
  }, [filteredProducts, productStocks, handleStockUpdate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Sidebar
        handleChange={handleChange}
        handleSort={handleSort}
        handleClearFilters={handleClearFilters}
      />
      <Nav query={query} handleInputChange={handleInputChange} />
      <Recommended handleButton={handleButton} />
      <Products result={result} />
    </>
  );
}

export default App;

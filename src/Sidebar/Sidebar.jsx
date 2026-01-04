import React from "react";
import Category from "./Category/Category";
import Price from "./Price/Price";
import "./Sidebar.css";

const Sidebar = ({ handleChange, handleSort, handleClearFilters }) => {
  return (
    <>
      <section className="sideBar">
        <div className="logo-container">
          <h1>🛒</h1>
        </div>

        <Category handleChange={handleChange} />
        <Price handleSort={handleSort} />

        <button onClick={handleClearFilters} className="clear-filters-btn">
          Clear All Filters
        </button>
      </section>
    </>
  );
};

export default Sidebar;

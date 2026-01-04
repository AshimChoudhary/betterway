import React from "react";
import "./Price.css";

function Price({ handleSort }) {
  return (
    <div className="ml">
      <h2 className="sideBar-title price-title">Sort By Price</h2>

      <div>
        <label className="sideBar-label-container">
          <input type="radio" onChange={handleSort} value="" name="test2" />
          <span className="checkmark"></span>No Sort
        </label>

        <label className="sideBar-label-container">
          <input
            type="radio"
            onChange={handleSort}
            value="lowToHigh"
            name="test2"
          />
          <span className="checkmark"></span>Low to High
        </label>

        <label className="sideBar-label-container">
          <input
            type="radio"
            onChange={handleSort}
            value="highToLow"
            name="test2"
          />
          <span className="checkmark"></span>High to Low
        </label>
      </div>
    </div>
  );
}

export default Price;

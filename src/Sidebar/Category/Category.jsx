import "./Category.css";

function Category({ handleChange }) {
  return (
    <div>
      <h2 className="sideBar-title">Category</h2>
      <div>
        <label className="sideBar-label-container">
          <input type="radio" onChange={handleChange} value="" name="test" />
          <span className="checkmark"></span>All
        </label>

        <label className="sideBar-label-container">
          <input
            type="radio"
            onChange={handleChange}
            value="beauty"
            name="test"
          />
          <span className="checkmark"></span>Beauty
        </label>

        <label className="sideBar-label-container">
          <input
            type="radio"
            onChange={handleChange}
            value="fragrances"
            name="test"
          />
          <span className="checkmark"></span>Fragrances
        </label>

        <label className="sideBar-label-container">
          <input
            type="radio"
            onChange={handleChange}
            value="furniture"
            name="test"
          />
          <span className="checkmark"></span>Furniture
        </label>

        <label className="sideBar-label-container">
          <input
            type="radio"
            onChange={handleChange}
            value="groceries"
            name="test"
          />
          <span className="checkmark"></span>Groceries
        </label>
      </div>
    </div>
  );
}

export default Category;

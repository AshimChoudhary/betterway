import "./Recommended.css";

function Recommended({ handleButton }) {
  return (
    <>
      <h2 className="recommended-title">Recommended</h2>
      <div className="recommended-flex">
        <button onClick={handleButton} value="" className="btns">
          All Products
        </button>
        <button onClick={handleButton} value="beauty" className="btns">
          Beauty
        </button>
        <button onClick={handleButton} value="fragrances" className="btns">
          Fragrances
        </button>
        <button onClick={handleButton} value="furniture" className="btns">
          Furniture
        </button>
        <button onClick={handleButton} value="groceries" className="btns">
          Groceries
        </button>
      </div>
    </>
  );
}

export default Recommended;

import { AiFillStar } from 'react-icons/ai';
import './Products.css';
import React from 'react';
import { BsFillBagHeartFill } from 'react-icons/bs';

const Products = ({ result }) => {
  return (
    <>
      <section className="card-container">{result}</section>
    </>
  );
};

export default Products;

import React, { useContext, useEffect } from "react";
import { productContext } from "../context";
import { Product } from "../types";

export const Dashboard = () => {
  const products = useContext(productContext);
  const createProduct = () => {
    console.log("create product");
    //fill up form
    //post request to backend
    //update local state
  };

  return (
    <div className="App">
      <header>
        <h1>products</h1>
        <button onClick={createProduct}>add product</button>
      </header>
      {products?.map((product: Product) => (
        <ProductCard product={product} />
      ))}
    </div>
  );
};
const ProductCard = (props: { product: Product }) => {
  return (
    <div>
      <h1>{props.product.SKU}</h1>
      <img src={props.product.image} alt={props.product.title} />
    </div>
  );
};

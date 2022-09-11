import React, { useContext, useEffect } from "react";
import { productContext } from "../context";
import { Product } from "../types";

export const Dashboard = () => {
  const products = useContext(productContext);
  useEffect(() => {
    console.log(products);
  }, [products]);
  return (
    <div className="App">
      <h1>products</h1>
      {products?.map((product: Product) => (
        <ProductCard product={product} />
      ))}
    </div>
  );
};
const ProductCard = (props: { product: Product }) => {
  return <h1>{props.product.SKU}</h1>;
};

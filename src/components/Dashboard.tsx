import React, { useContext } from "react";
import { productContext } from "../context";
import { Product } from "../types";
import { Link } from "react-router-dom";
import "../tailwind.output.css";

export const Dashboard = () => {
  const products = useContext(productContext);
  return (
    <section style={{ backgroundColor: " #eee;" }}>
      {products?.map((product: Product) => (
        <ProductCard product={product} />
      ))}
    </section>
  );
};
const ProductCard = (props: { product: Product }) => {
  return (
    <div className="flex justify-center" key={props.product.SKU}>
      <div className="rounded-lg shadow-lg bg-white max-w-sm">
        <a href="#!">
          <img className="rounded-t-lg" src={props.product.image} alt="" />
        </a>
        <div className="p-6">
          <h5 className="text-gray-900 text-xl font-medium mb-2">
            {props.product.title}
          </h5>
          <p className="text-gray-700 text-base mb-4">{props.product.SKU}</p>

          <a
            href={`/item/${props.product.SKU}`}
            className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            View
          </a>
        </div>
      </div>
    </div>
  );
};

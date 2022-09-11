import React, { useContext } from "react";
import { productContext } from "../context";
import { Product } from "../types";
import "../tailwind.output.css";

export const Dashboard = () => {
  const products = useContext(productContext);
  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-10 px-12 h-screen">
      <div className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products?.map((product: Product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </section>
  );
};
const ProductCard = (props: { product: Product }) => {
  return (
    <div className="flex justify-center" key={props.product.SKU}>
      <div className="rounded-lg shadow-lg bg-white max-w-sm">
        <img className="rounded-t-lg" src={props.product.image} alt="" />
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

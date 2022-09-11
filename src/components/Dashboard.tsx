import React, { useContext, useEffect } from "react";
import { productContext } from "../context";
import { Product } from "../types";
import "../tailwind.output.css";

export const Dashboard = () => {
  const products = useContext(productContext);
  const createProduct = () => {
    console.log("create product");
    //fill up form
    //post request to backend
    //update local state
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between">
        <ul className="navbar-nav mr-auto lg:flex lg:flex-row">
          <li className="nav-item">
            <a
              className="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
              href="#!"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
            >
              Dashboard
            </a>
          </li>
        </ul>
        <div className="flex space-x-2 justify-center">
          <button
            onClick={createProduct}
            type="button"
            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
          Add
          </button>
        </div>
      </nav>

      <section style={{ backgroundColor: " #eee;" }}>
        {products?.map((product: Product) => (
          <ProductCard product={product} />
        ))}
      </section>
    </>
  );
};
const ProductCard = (props: { product: Product }) => {
  return (
    <div className="flex justify-center">
      <div className="rounded-lg shadow-lg bg-white max-w-sm">
        <a href="#!">
          <img className="rounded-t-lg" src={props.product.image} alt="" />
        </a>
        <div className="p-6">
          <h5 className="text-gray-900 text-xl font-medium mb-2">
            {props.product.title}
          </h5>
          <p className="text-gray-700 text-base mb-4">{props.product.SKU}</p>
          <button
            type="button"
            className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

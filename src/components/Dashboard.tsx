import { Link } from "react-router-dom";

import { Product } from "../types";
import "../tailwind.output.css";
import { trpc } from "../trpc";
import { filterContext } from "../context";
import { useContext } from "react";
export const Dashboard = () => {
  const products = trpc.useQuery(["products.getProducts"]);
  const { filteredProducts } = useContext(filterContext);
  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-10 px-12 h-max min-h-screen">
      <div className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {filteredProducts.length > 0
          ? filteredProducts?.map((product: Product) => (
              <ProductCard product={product} key={product._id} />
            ))
          : products?.data
              ?.reverse()
              .map((product: Product) => (
                <ProductCard product={product} key={product._id} />
              ))}
      </div>
    </section>
  );
};
const ProductCard = (props: { product: Product }) => {
  return (
    <div
      className="my-8 rounded shadow-lg bg-white duration-300 hover:-translate-y-1 "
      key={props.product._id}
    >
      <img
        className="rounded-t-lg h-80 w-full"
        src={props.product.image}
        alt={props.product.title}
      />
      <div className="p-6">
        <h5 className="text-gray-900 text-xl font-medium mb-2">
          #{props.product._id}
        </h5>
        <p className="text-gray-700 text-base mb-4">{props.product.title}</p>
      </div>
      <Link
        to={`/item/${props.product?._id}`}
        className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full text-center"
      >
        View
      </Link>
    </div>
  );
};

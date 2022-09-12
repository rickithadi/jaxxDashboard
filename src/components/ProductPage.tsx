import { Redirect, useParams } from "react-router-dom";
import { trpc } from "../trpc";

export const ProductPage = () => {
  let { id } = useParams<{ id: string }>();

  const { data: product, error } = trpc.useQuery(["getProduct", id]);

  return (
    <>
      {error ? (
        <Redirect to="/dashboard" />
      ) : (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 ">
          <div
            className="rounded-lg shadow-lg bg-white max-w-sm"
            key={product?.SKU}
          >
            <img
              className="rounded-t-lg"
              src={product?.image}
              alt={product?.title}
            />
            <div className="p-6">
              <h5 className="text-gray-900 text-xl font-medium mb-2">
                #{product?.SKU}
              </h5>
              <p className="text-gray-700 text-base mb-4">{product?.title}</p>
            </div>
            <a
              href={`/item/${product?.SKU}`}
              className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full text-center"
            >
              View
            </a>
          </div>
        </div>
      )}
    </>
  );
};

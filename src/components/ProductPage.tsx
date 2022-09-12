import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { Redirect, useParams } from "react-router-dom";
import { trpc } from "../trpc";
import { createBrowserHistory } from "history";
export const ProductPage = () => {
  let { id } = useParams<{ id: string }>();

  const [deleting, setDelete] = useState(false);
  const [edit, setEdit] = useState(false);
  const queryClient = useQueryClient();

  let history = createBrowserHistory();
  const { data: product, error } = trpc.useQuery(["getProduct", id]);

  useEffect(() => {
    if (!product) return history.push("/dashboard");
  }, [product]);
  const deleteMutation = trpc.useMutation("deleteProduct", {
    onSuccess: () =>
      queryClient
        .invalidateQueries(["getProduct", id])
        .then(() => setDelete(false)),
  });

  const deleteProduct = () => {
    deleteMutation.mutate(product?._id);
  };

  const deleteModal = () => (
    <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
      <div className="bg-white px-16 py-14 rounded-md text-center">
        <h1 className="text-xl mb-4 font-bold text-slate-500">
          Do you Want Delete {product?.title} #{product?.SKU}
        </h1>
        <button
          className="bg-red-500 px-4 py-2 rounded-md text-md text-white"
          onClick={() => setDelete(false)}
        >
          Cancel
        </button>
        <button
          className="bg-indigo-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
          onClick={() => deleteProduct()}
        >
          yes
        </button>
      </div>
    </div>
  );

  return (
    <>
      {error ? (
        <Redirect to="/dashboard" />
      ) : (
        <div className="flex  items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 px-12 px-0 ">
          {deleting && deleteModal()}
          {product && (
            <div
              className="rounded-lg shadow-lg bg-white max-w-sm "
              key={product?.SKU}
            >
              <img
                className="rounded-t-lg"
                src={product?.image}
                alt={product?.title}
              />
              <div className="flex justify-between items-center px-2">
                <div className="p-6">
                  <h5 className="text-gray-900 text-xl font-medium mb-2">
                    #{product?.SKU}
                  </h5>
                  {edit ? (
                    <input
                      className="text-gray-700 text-base mb-2"
                      placeholder={product?.title}
                      value={product?.title}
                    ></input>
                  ) : (
                    <p className="text-gray-700 text-base mb-4">
                      {product?.title}
                    </p>
                  )}
                </div>
                {!edit && (
                  <button
                    className="flex items-center justify-center text-xs font-medium rounded-full px-5 py-2 space-x-1 bg-red-500 text-black"
                    onClick={() => setDelete(true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="white"
                      className="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      {" "}
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />{" "}
                      <path
                        fill-rule="evenodd"
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                      />{" "}
                    </svg>
                  </button>
                )}
              </div>
              {edit ? (
                <button
                  className=" inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out w-full text-center"
                  onClick={() => setEdit(!edit)}
                >
                  Save
                </button>
              ) : (
                <button
                  className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full text-center"
                  onClick={() => setEdit(!edit)}
                >
                  Edit
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

import { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { trpc } from "../trpc";
import { DeleteModal } from "./DeleteModal";
import { convertBase64 } from "./helpers";

export const ProductPage = () => {
  let { id } = useParams<{ id: string }>();

  const [deleting, setDelete] = useState(false);
  const [edit, setEdit] = useState(false);

  let history = useHistory();
  const {
    data: product,
    error,
    refetch,
  } = trpc.useQuery(["products.getProduct", id]);
  // TODO unsafe, figure out a type
  const [editProductInput, setEditProductInput] = useState(product as any);

  const deleteMutation = trpc.useMutation("products.deleteProduct", {
    onSuccess: () => history.push("/dashboard"),
  });
  const editMutation = trpc.useMutation("products.editProduct", {
    onSuccess: () => refetch().then(() => setEdit(false)),
  });
  useEffect(() => {
    setEditProductInput(product);
  }, [product, history]);

  const editProduct = () => {
    editMutation.mutate({ ...editProductInput, _id: product?._id });
  };
  const deleteProduct = () => {
    deleteMutation.mutate(product?._id);
  };

  const buttons = (edit: boolean) =>
    edit ? (
      <div className="flex space-x-2 justify-center">
        <button
          className=" inline-block px-6 py-2.5 bg-yellow-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-700 hover:shadow-lg focus:bg-yellow-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-800 active:shadow-lg transition duration-150 ease-in-out w-full text-center"
          onClick={() => setEdit(!edit)}
        >
          cancel
        </button>

        <button
          disabled={!editProductInput}
          className=" inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out w-full text-center disabled:opacity-25"
          onClick={() => editProduct()}
        >
          Save
        </button>
      </div>
    ) : (
      <div className="flex space-x-2 justify-center">
        <button
          className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full text-center"
          onClick={() => setEdit(!edit)}
        >
          Edit
        </button>
        <button
          className=" inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out w-full text-center"
          onClick={() => setDelete(true)}
        >
          Delete
        </button>
      </div>
    );
  return (
    <>
      {error ? (
        <Redirect to="/dashboard" />
      ) : (
        <div className="flex  items-center justify-center h-max bg-gray-100 dark:bg-gray-900  px-0 ">
          {product && (
            <div
              className="rounded-lg shadow-lg bg-white w-80"
              key={product?._id}
            >
              {deleting && (
                <DeleteModal
                  product={product}
                  deleteProduct={deleteProduct}
                  setDeleteFalse={() => setDelete(false)}
                />
              )}
              <img
                className="rounded-t-lg h-80 w-full"
                src={
                  editProductInput?.image
                    ? editProductInput?.image
                    : product?.image
                }
                alt={product?.title}
              />
              {edit && (
                <div className="flex items-center  ">
                  <input
                    onChange={(event) => {
                      if (event.target.files && event.target.files[0]) {
                        let img = event.target.files[0];
                        convertBase64(img).then((res) => {
                          setEditProductInput({
                            ...editProductInput,
                            image: res,
                          });
                        });
                      }
                    }}
                    type="file"
                    accept="image/*"
                    className="block w-half text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "
                  />
                </div>
              )}
              <div className="flex justify-between items-center px-2">
                <div className="p-6">
                  <h5 className="text-gray-900 text-xl font-medium mb-2">
                    #{product?._id}
                  </h5>
                  {edit ? (
                    <input
                      className="text-gray-700 text-base mb-4"
                      autoFocus
                      placeholder={product?.title}
                      defaultValue={product?.title}
                      onChange={(event) => {
                        setEditProductInput({
                          ...editProductInput,
                          title: event.target.value,
                        });
                      }}
                    ></input>
                  ) : (
                    <p className="text-gray-700 text-base mb-4">
                      {product?.title}
                    </p>
                  )}
                </div>
              </div>
              {buttons(edit)}
            </div>
          )}
        </div>
      )}
    </>
  );
};

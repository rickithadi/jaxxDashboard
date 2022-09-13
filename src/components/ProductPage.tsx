import { useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { createBrowserHistory } from "history";

import { trpc } from "../trpc";

export const ProductPage = () => {
  let { id } = useParams<{ id: string }>();

  const [deleting, setDelete] = useState(false);
  const [edit, setEdit] = useState(false);

  let history = createBrowserHistory();
  const { data: product, error, refetch } = trpc.useQuery(["getProduct", id]);
  // TODO unsafe, figure out a type
  const [editProductInput, setEditProductInput] = useState(product as any);

  const deleteMutation = trpc.useMutation("deleteProduct", {
    onSuccess: () => history.push({ pathname: "/dashboard" }),
  });
  const editMutation = trpc.useMutation("editProduct", {
    onSuccess: () => refetch(),
  });

  const editProduct = () => {
    if (!editProductInput?.title) {
      setEditProductInput({ ...editProductInput, title: product?.title });
    }
    if (!editProductInput?.image) {
      setEditProductInput({ ...editProductInput, image: product?.image });
    }

    setEdit(false);
    editMutation.mutate({ ...editProductInput, _id: product?._id });
  };
  const deleteProduct = () => {
    setDelete(false);
    deleteMutation.mutate(product?._id);
  };

  //TODO seperate into components
  const deleteModal = () => (
    <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
      <div className="bg-white px-16 py-14 rounded-md text-center">
        <h1 className="text-xl mb-4 font-bold text-slate-500">
          Delete {product?.title} #{product?._id}?
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
          className=" inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out w-full text-center"
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
  //  TODO seperate into helper
  const convertBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  return (
    <>
      {error ? (
        <Redirect to="/dashboard" />
      ) : (
        <div className="flex  items-center justify-center h-screen bg-gray-100 dark:bg-gray-900  px-0 ">
          {deleting && deleteModal()}
          {product && (
            <div
              className="rounded-lg shadow-lg bg-white w-80"
              key={product?._id}
            >
              <img
                className="rounded-t-lg h-80 w-80"
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

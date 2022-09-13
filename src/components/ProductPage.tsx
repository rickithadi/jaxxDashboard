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
    onSuccess: () => history.push("/dashboard"),
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
    editMutation.mutate(editProductInput);
  };
  const deleteProduct = () => {
    deleteMutation.mutate(product?._id);
  };

  //TODO seperate into components
  const deleteModal = () => (
    <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
      <div className="bg-white px-16 py-14 rounded-md text-center">
        <h1 className="text-xl mb-4 font-bold text-slate-500">
          Do you Want Delete {product?.title} #{product?._id}
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
      <button
        disabled={!editProductInput}
        className=" inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out w-full text-center"
        onClick={() => editProduct()}
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
              {buttons(edit)}
            </div>
          )}
        </div>
      )}
    </>
  );
};

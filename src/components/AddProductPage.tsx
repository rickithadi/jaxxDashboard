import { useState } from "react";

export const AddProductPage = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({
    title: "",
    image: "",
    general: "",
  });

  const createProduct = () => {
    //make api call to create product
    console.log("created product");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 ">
      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
        {errors.general && (
          <div className="mb-3 text-normal text-red-500 ">{errors.general}</div>
        )}
        <form onSubmit={createProduct}>
          <div className="form-group mb-6">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label inline-block mb-2 text-gray-700"
            >
              Item Name
            </label>
            <input
              type="text"
              className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && (
              <div className="mb-3 text-normal text-red-500 ">
                {errors.title}
              </div>
            )}

            <small id="emailHelp" className="block mt-1 text-xs text-gray-600">
              Something descriptive
            </small>
          </div>
          <div className="form-group mb-6">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label inline-block mb-2 text-gray-700"
            >
              Picture
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.value)}
              value={image}
              className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Password"
            />
            {errors.image && (
              <div className="mb-3 text-normal text-red-500 ">
                {errors.image}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      disabled:opacity-25
      ease-in-out"
            disabled={!image || !title}
            onClick={(e) => {
              createProduct();
              e.preventDefault();
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

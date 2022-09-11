export const AuthedHeader = () => {
  const createProduct = () => {
    console.log("create product");
    //fill up form
    //post request to backend
    //update local state
  };

  return (
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
  );
};

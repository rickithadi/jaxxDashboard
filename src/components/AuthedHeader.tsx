import { Link, useLocation } from "react-router-dom";

export const AuthedHeader = () => {
  const currentRoute = useLocation().pathname;
  const createProduct = () => {
    console.log("create product");
    //fill up form
    //post request to backend
    //update local state
  };

  return (
    <nav className="navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between">
      <li className="nav-item">
        <div
          className="nav-link block pr-2 lg:px-12 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
        >
          {currentRoute.split("/")[1] === "item" ||
          currentRoute.split("/")[1] === "add" ? (
            <Link to="/">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="far"
                data-icon="arrow-alt-circle-left"
                className="w-12 h-10 "
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M8 256c0 137 111 248 248 248s248-111 248-248S393 8 256 8 8 119 8 256zm448 0c0 110.5-89.5 200-200 200S56 366.5 56 256 145.5 56 256 56s200 89.5 200 200zm-72-20v40c0 6.6-5.4 12-12 12H256v67c0 10.7-12.9 16-20.5 8.5l-99-99c-4.7-4.7-4.7-12.3 0-17l99-99c7.6-7.6 20.5-2.2 20.5 8.5v67h116c6.6 0 12 5.4 12 12z"
                ></path>
              </svg>
            </Link>
          ) : (
            <input
              type="text"
              placeholder="Search"
              className="w-full text-lg px-4 py-4 rounded-md rounded-r-none outline-none"
            />
          )}
        </div>
      </li>

      {currentRoute.split("/")[1] !== "add" && (
        <div
          className="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
        >
          <Link
            to="/add"
            type="button"
            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Add
          </Link>
        </div>
      )}
    </nav>
  );
};

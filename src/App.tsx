import React, { useContext } from "react";
import { Dashboard } from "./components/Dashboard";
import { BrowserRouter as Router, Route, Link } from "react-routerdom";

import "./index.css";
import { authContext } from "./context";
import { ProductPage } from "./components/ProductPage";

function App() {
  const user = useContext(authContext);

  return (
    <div>
                <Route path="/:id" children={<ProductPage />} />

      {user ? (
        <Dashboard />
      ) : (
        <div>
          <h1>log in</h1>
        </div>
      )}
    </div>
  );
}

export default App;

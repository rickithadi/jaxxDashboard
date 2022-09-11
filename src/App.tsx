import React, { useContext } from "react";
import { Dashboard } from "./components/Dashboard";

import { Route } from "react-router-dom";
import "./index.css";
import { authContext } from "./context";
import { ProductPage } from "./components/ProductPage";
import { LoginPage } from "./components/LoginPage";

function App() {
  const user = useContext(authContext);

  return (
    <div>
      <Route exact path="/">
        {user ? <Dashboard /> : <LoginPage />}
      </Route>

      {user && <Route path="/:id" children={<ProductPage />} />}
    </div>
  );
}

export default App;

import React, { useContext } from "react";
import { Dashboard } from "./components/Dashboard";

import { Route, Switch } from "react-router-dom";
import "./index.css";
import { authContext } from "./context";
import { ProductPage } from "./components/ProductPage";

function App() {
  const user = useContext(authContext);

  return (
    <div>
      {user ? (
        <Switch>
          <Route path="/:id" children={<ProductPage />}/>
          <Route path="/" children={<Dashboard />}></Route>
        </Switch>
      ) : (
        <Route path="/login">
          <div>
            <h1>log in</h1>
          </div>
        </Route>
      )}
    </div>
  );
}

export default App;

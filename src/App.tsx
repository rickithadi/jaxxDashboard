import React, { useContext } from "react";
import { Dashboard } from "./components/Dashboard";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";

import "./index.css";
import { authContext } from "./context";
import { ProductPage } from "./components/ProductPage";
import { LoginPage } from "./components/LoginPage";
import { AuthedHeader } from "./components/AuthedHeader";
import { AddProductPage } from "./components/AddProductPage";

export const App = () => {
  const withAuthedHeader = (component: JSX.Element) => (
    <>
      <AuthedHeader />
      {component}
    </>
  );
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={() => <LoginPage />} />
        {/* Private Routes */}
        <PrivateRoute
          exact
          path="/add"
          component={() => withAuthedHeader(<AddProductPage />)}
        />

        <PrivateRoute
          exact
          path="/item/:id"
          component={() => withAuthedHeader(<ProductPage />)}
        />

        <PrivateRoute
          exact
          path="/dashboard"
          component={() => withAuthedHeader(<Dashboard />)}
        />
        {/* fallback */}
        <PrivateRoute path="*" component={() => <Redirect to="/dashboard" />} />
      </Switch>
    </Router>
  );
};

type Props = {
  path: string | string[];
  exact?: boolean;
  component: React.ComponentType;
};

export const PrivateRoute = ({
  component,
  path,
  exact = false,
  ...rest
}: Props) => {
  const user = useContext(authContext);
  if (!user) return <Redirect to="/login" />;

  return <Route {...rest} component={component} path={path} exact={exact} />;
};

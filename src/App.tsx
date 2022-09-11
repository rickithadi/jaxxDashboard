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
        {/* Private Routes */}
        <PrivateRoute
          exact
          path="/item/:id"
          component={() => withAuthedHeader(<ProductPage />)}
        />

        <PrivateRoute
          path="/dashboard"
          component={() => withAuthedHeader(<Dashboard />)}
        />
        <PrivateRoute path="/" component={() => <Redirect to="/dashboard" />} />
        <Route path="/login" component={() => <LoginPage />} />
        <Route path="/" component={() => <Redirect to="/login" />} />
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

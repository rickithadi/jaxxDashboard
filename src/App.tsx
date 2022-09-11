import React, { useContext } from "react";
import { Dashboard } from "./components/Dashboard";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";

import { Route } from "react-router-dom";
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
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={() => <LoginPage />} />
        {/* Private Routes */}
        <PrivateRoute
          path="/dashboard"
          component={() => withAuthedHeader(<Dashboard />)}
        />
        <PrivateRoute
          path="/dashboard/:id"
          component={() => withAuthedHeader(<ProductPage />)}
        />

        <PrivateRoute path="*" component={() => <Redirect to="/dashboard" />} />

        <Route path="*" component={() => <Redirect to="/dashboard" />} />
      </Switch>
    </BrowserRouter>
  );
};

type Props = {
  path: string | string[];
  component: React.ComponentType;
};

export const PrivateRoute = ({ component, path, ...rest }: Props) => {
  const user = useContext(authContext);
  if (!user) return <Redirect to="/login" />;

  return <Route {...rest} component={component} path={path} />;
};

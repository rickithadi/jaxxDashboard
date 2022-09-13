import React, { useContext, useState } from "react";
import { Dashboard } from "./components/Dashboard";
import {
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
import { QueryClient, QueryClientProvider } from "react-query";
import { trpc } from "./trpc";

export const App = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: "http://localhost:8080/trpc",
      // optional
      // headers() {
      //   return {
      //     authorization: getAuthCookie(),
      //   };
      // },
    })
  );
  const withAuthedHeader = (component: JSX.Element) => (
    <>
      <AuthedHeader />
      {component}
    </>
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
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
            <PrivateRoute
              path="*"
              component={() => <Redirect to="/dashboard" />}
            />
          </Switch>
      </QueryClientProvider>
    </trpc.Provider>
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

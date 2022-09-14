import React, { useContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Switch, Redirect, Route } from "react-router-dom";

import { Dashboard } from "./components/Dashboard";
import "./index.css";
import { authContext } from "./context";
import { ProductPage } from "./components/ProductPage";
import { LoginPage } from "./components/LoginPage";
import { AuthedHeader } from "./components/AuthedHeader";
import { AddProductPage } from "./components/AddProductPage";
import { trpc } from "./trpc";
import { User } from "./types";

export const App = () => {
  let localUser = JSON.parse(localStorage.getItem("user") || "null");
  console.log("localUser", localUser);
  const [user, setUser] = useState(localUser || (undefined as unknown as User));

  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: "http://localhost:8080/trpc",
      headers() {
        return {
          authorization: user.token,
        };
      },
    })
  );
  const withAuthedHeader = (component: JSX.Element) => (
    <>
      <AuthedHeader />
      {component}
    </>
  );
  return (
    <authContext.Provider value={{ user, setUser }}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <Switch>
            {/* fallback */}
            <PrivateRoute
              exact
              path="/dashboard"
              component={() => withAuthedHeader(<Dashboard />)}
            />
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
              path="/*"
              component={() => <Redirect to="/dashboard" />}
            />
          </Switch>
        </QueryClientProvider>
      </trpc.Provider>
    </authContext.Provider>
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
  const { user } = useContext(authContext);
  if (!user || !user.token || user.token === "")
    return <Redirect to="/login" />;

  return <Route {...rest} component={component} path={path} exact={exact} />;
};

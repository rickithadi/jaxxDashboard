import React, { useContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Switch, Redirect, Route } from "react-router-dom";

import { Dashboard } from "./components/Dashboard";
import "./index.css";
import { authContext, filterContext } from "./context";
import { ProductPage } from "./components/ProductPage";
import { LoginPage } from "./components/LoginPage";
import { AuthedHeader } from "./components/AuthedHeader";
import { AddProductPage } from "./components/AddProductPage";
import { trpc } from "./trpc";
import { Product, User } from "./types";
import { JsxElement } from "typescript";

export const App = () => {
  let localUser = JSON.parse(localStorage.getItem("user") || "null");
  // TODO unsafe types
  const [user, setUser] = useState(localUser || (undefined as unknown as User));
  const [filteredProducts, setFilteredProducts] = useState([] as Product[]);
  const [isLoading, setIsLoading] = useState(false);

  const withAuthedHeader = (component: JSX.Element) => (
    <>
      <AuthedHeader />
      {component}
    </>
  );
  return (
    <authContext.Provider value={{ user, setUser }}>
      <filterContext.Provider
        value={{
          filteredProducts,
          setFilteredProducts,
          isLoading,
          setIsLoading,
        }}
      >
        <TRPCWrapper>
          <Switch>
            <Route exact path="/login" component={() => <LoginPage />} />
            <PrivateRoute
              exact
              path="/dashboard"
              component={() => withAuthedHeader(<Dashboard />)}
            />
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
        </TRPCWrapper>
      </filterContext.Provider>
    </authContext.Provider>
  );
};
const TRPCWrapper = ({ children }: any) => {
  const { user } = useContext(authContext);
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: "http://localhost:8080/trpc",
      headers() {
        return {
          authorization: user?.token,
        };
      },
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
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
  const { user } = useContext(authContext);
  console.log(user);
  if (!user || !user.token || user.token === "")
    return <Redirect to="/login" />;

  return <Route {...rest} component={component} path={path} exact={exact} />;
};

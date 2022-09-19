import { createContext } from "react";
import { Product, User } from "./types";

// export const { authContext, setAuth } = createContext(undefined);
export type Auth = {
  user: User | undefined;
  token?: string;
  setUser: (user: User) => void;
};

export const authContext = createContext<Auth>({
  user: undefined,
  setUser: () => {},
});
export type Filter = {
  filteredProducts: Product[] | [];
  isLoading: boolean;
  setFilteredProducts: (products: Product[]) => void;
  setIsLoading: (toggle: boolean) => void;
};
export const filterContext = createContext<Filter>({
  filteredProducts: [],
  isLoading: false,
  setIsLoading: () => {},
  setFilteredProducts: () => {},
});

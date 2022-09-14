import { createContext, Dispatch, SetStateAction } from "react";
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

export const productContext = createContext<undefined | Product[]>(undefined);

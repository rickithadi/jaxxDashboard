import { createContext } from "react";
import { Product, User } from "./types";

export const authContext = createContext<undefined | User>(undefined);
export const productContext = createContext<undefined | Product[]>(undefined);

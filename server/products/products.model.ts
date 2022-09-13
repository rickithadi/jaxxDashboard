import { model } from "mongoose";
import { IProductDocument } from "./products.types";
import ProductSchema from "./products.schema";

export const ProductModel = model<IProductDocument>("product", ProductSchema);

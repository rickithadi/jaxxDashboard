import { Types } from "mongoose";

export type User = {
  email: string;
  _id: Types.ObjectId;
  token: string;
};
export type Product = {
  _id: string; //this is SKU as well
  title: string;
  image: string;
};

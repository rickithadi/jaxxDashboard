import { Document, Model } from "mongoose";

export interface IProduct {
  title: string;
  image: string;
}

export interface IProductDocument extends IProduct, Document {}
export interface IProductModel extends Model<IProductDocument> {}

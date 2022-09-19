import mongoose from "mongoose";
import { ProductModel } from "./products/products.model";
import { UserModel } from "./user/user.model";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017");
    await mongoose.set("autoIndex", true);
  } catch (error: any) {
    console.log(error);
    process.exit(1);
  }
  console.log("🚀 Database connected...");
};

export const disconnect = () => {
  mongoose.disconnect();
};
export const dropCollections = async () => {
  try {
    console.log("🚀 Dropping collections...");
    UserModel.collection.drop();
    ProductModel.collection.drop();
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

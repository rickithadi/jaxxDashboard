import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017");
    console.log("🚀 Database connected...");
  } catch (error: any) {
    console.log(error);
    process.exit(1);
  }
};

export const disconnect = () => {
  mongoose.disconnect();
};

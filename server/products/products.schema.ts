// Main schema file where we can define the
// required attributes
import * as Mongoose from "mongoose";

const ProductSchema = new Mongoose.Schema({
  title: String,
  image: String,
});
ProductSchema.index({ title: "text" });
ProductSchema.index({ _id: "text" });

export default ProductSchema;

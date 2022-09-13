// Main schema file where we can define the
// required attributes
import * as Mongoose from "mongoose";

const ProductSchema = new Mongoose.Schema({
  SKU: String,
  title: String,
  image: String,
});

export default ProductSchema;

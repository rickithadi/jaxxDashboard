// Main schema file where we can define the
// required attributes
import * as Mongoose from "mongoose";

const UserSchema = new Mongoose.Schema({
  email: String,
  password: String,
  token: String,
});

export default UserSchema;

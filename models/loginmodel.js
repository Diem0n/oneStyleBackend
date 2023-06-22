import { Schema, model } from "mongoose";

const loginSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordhash: {
    type: String,
    required: true,
  },
  userid: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Login = model("Login", loginSchema);

export default Login;

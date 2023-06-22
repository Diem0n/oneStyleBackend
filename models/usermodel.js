import { Schema, model } from "mongoose";
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    address1: {
      type: String,
      required: true,
    },
    address2: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: true,
    },
    zipcode: {
      type: String,
      required: true,
    },
  },
  favbrands :[{
    type: Schema.Types.ObjectId,
    ref: "Brand",
    required: false,
  }],
});

const User = model("User", userSchema);

export default User;

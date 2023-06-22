import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  productid: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  orderstatus: {
    type: String,
    required: true,
  },
  deliveryaddress: {
    type: String,
    required: true,
  },
  paymentmethod: {
    type: String,
    required: true,
  },
  orderdate: {
    type: Date,
    required: true,
  },
});

const Order = model("Order", orderSchema);

export default Order;

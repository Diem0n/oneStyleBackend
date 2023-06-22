import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  instock: {
    type: Boolean,
    requried: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    requried: true,
  },
  brand: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

const Product = model("Product", productSchema);

export default Product;

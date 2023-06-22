import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  categoryName: {
    type: String,
    required: true,
  },
  brands: [{ type: Schema.Types.ObjectId, ref: "Brand" }],
});

const Category = model("Category", categorySchema);

export default Category;

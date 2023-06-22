import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
  {
    productid: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    userid: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    dateposted: {
      type: Date,
      require: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);

const Review = model("Review", reviewSchema);

export default Review;

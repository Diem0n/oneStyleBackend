import { Schema, model } from "mongoose";

const saleSchema = new Schema({
  productid: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  priceold: {
    type: Number,
    required: true,
  },
  newprice: {
    type: Number,
    required: true,
  },
  validtill: {
    type: String,
    required: true,
  },
  percentageOff: {
    type: Number,
    default: 0,
  },
});

saleSchema.pre("save", function (next) {
  this.percentageOff = ((this.priceold - this.newprice) / this.priceold) * 100;
  next();
});

const Sale = model("Sale", saleSchema);

export default Sale;

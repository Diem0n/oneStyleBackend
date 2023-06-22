import {Schema , model} from "mongoose";

const brandSchema = new Schema({
    brandName : {
        type : String,
        required : true,
    },
});


const Brand = model("Brand", brandSchema);

export default Brand;
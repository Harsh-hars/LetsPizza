import mongoose from "mongoose";
const cartschema = mongoose.Schema({
    title : String,
    photo:String,
    description : String,
    amount : Number
})

export const cartmodel = mongoose.model("cart" , cartschema); 
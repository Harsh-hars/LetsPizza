import mongoose from "mongoose";
const burgerschema = mongoose.Schema({
    title : String ,
    description : String ,
    photo:String,
    amount:Number
},{
    timestamps:true,
})

export const burgermodel = mongoose.model('burger' , burgerschema);
import mongoose from "mongoose";

const orderschema = mongoose.Schema({
    cartdata : [
        {
            title : String ,
            description : String ,
            photo:String ,
            amount:Number
        }
    ],
    
        phone:Number,
        address:String,
        street:String,
        pincode:Number,
        country:String    
    
    
});

export const ordermodel = mongoose.model("order" , orderschema);
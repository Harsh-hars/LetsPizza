import mongoose from "mongoose";
const pizzaschema = mongoose.Schema({
    title : String ,
    description : String ,
    photo:String ,
    amount:Number
},{
    timestamps:true,
})

export const pizzamodel = mongoose.model('pizza' , pizzaschema);
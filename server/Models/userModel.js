import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:String,
    email:{type:String , unique:true},
    password: String
})


export const usermodel = mongoose.model("user",userSchema);
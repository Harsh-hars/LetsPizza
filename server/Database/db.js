import mongoose from "mongoose"

export const db = async()=>{
    const mongo_uri = "mongodb+srv://manu:harsh@cluster0.3idwl4r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  try {
    await mongoose.connect(mongo_uri);
    console.log("database connected successfully")
  } catch (error) {
    console.log(error.message);
  }
}
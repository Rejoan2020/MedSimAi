import mongoose from "mongoose";

export async function dbconnect(){
    try{
        const conn = await mongoose.connect(String(process.env.MONGODB_URI));
        console.log("success!")
        return conn;
    }catch(err){
        console.error(err);
    }
}

dbconnect();
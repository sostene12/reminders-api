import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.MONGO_URL

const dbConnect = ():void =>{
    mongoose.Promise = Promise;
    mongoose.connect(url);
    mongoose.connection.on('connected',() => console.log("connected db."))
    mongoose.connection.on('error',(error:Error) => console.log(error))
};

export default dbConnect;
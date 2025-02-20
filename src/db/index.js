import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB=async ()=>{
    const URL=process.env.MONOGO_URI;
    // console.log(URL)
    try {
       const connectionInstance = await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
       console.log(`\n MongoDB connected !! DB HOST :${connectionInstance.connection.host}`)

    } catch (error) {
        console.log("MONGODB conection FAILED:",error);
        process.exit(1)
    }
}

export default connectDB;
import mongoose from "mongoose";


const connectDB = async () => mongoose.connect(process.env.Date_Base_URLS);

export default connectDB;
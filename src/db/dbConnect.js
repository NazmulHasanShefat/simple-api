import mongoose from "mongoose";
const dbConnect = async ()=>{
    try {
        const dbConnectionInstance = await mongoose.connect(process.env.DB_URL);
        console.log(`✅ db connected successfully ${dbConnectionInstance.connection.host}`);
    } catch (error) {
        console.log("❌ faild to connect db dbConnect.js",error)
    }
}
export default dbConnect;
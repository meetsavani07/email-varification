import mongoose from "mongoose"
export const connectDB = async () => {
    try {
        console.log("Mongo_URL",process.env.MONGO_URL);
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("Error In Connection!!!!!",error.message);
        // Failure, 0 status code is success    
        process.exit(1) // This is Process .exit() which will terminate the process
    }
}
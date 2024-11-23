import mongoose from "mongoose"
export const connectDB = async () =>{
    try{
        console.log("Mongo_URL :- ",process.env.MONGO_URL);
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error){
        console.log("Error Connrction to MongoDB :- ",error.mongoose);
        process.exit(1); // fail to connect and return 1
    }
}
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./database/connectDB.js"
import authRoutes from "./routes/auth.routes.js"

dotenv.config(); // .env file configuration
const app = express(); // express app creation
const PORT = process.env.PORT || 5000; // port number from .env file or default

// This is where we connect to our database to check and display
app.get("/", (req,res) => {
    res.send("Meet Savani"); // web page display output
});

app.use(express.json()); // alloes us to parse incoming requests with JSON payloads

// auth routes
app.use("/api/auth",authRoutes);

// server is runnung on port 3000
app.listen(PORT, () => {
    connectDB();
    console.log("Server is running on port :-",PORT);
});
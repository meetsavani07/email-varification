// const express = require('express');
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from "./database/connectDB.js";
import authRoutes from "./routes/auth.route.js";
dotenv.config();
const app = express();

// This code Print The Web Output
app.get("/",(req, res) => {
    res.send("Hello World");
});

app.use("/api/auth", authRoutes);

// This code Connect to the Database
app.listen(3000, () => {
    connectDB();
    console.log('Server is running on port 3000');
});
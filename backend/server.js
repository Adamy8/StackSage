// const express = require('express');
import express from 'express';
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from './config/db.js';
// import Product from './model/product.model.js';
// import mongoose from 'mongoose';
import productRoutes from "./routes/product.route.js";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5010;      // || 5010 is for when forget to set PORT in .env
app.use(express.json()); // make it accept JSON data in the req.body
app.use("/api/products/",productRoutes);

const __dirname = path.resolve();
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req,res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

app.listen(PORT,()=>{
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
});

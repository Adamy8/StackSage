// const express = require('express');
import express from 'express';
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from './config/db.js';
// import Product from './model/product.model.js';
// import mongoose from 'mongoose';
import productRoutes from "./routes/product.route.js";

const app = express();
app.use(express.json()); // make it accept JSON data in the req.body

app.use("/api/products/",productRoutes);

app.listen(5010,()=>{
    connectDB();
    console.log("Server started at http://localhost:5010");
});

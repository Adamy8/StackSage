// const express = require('express');
import express from 'express';
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from './config/db.js';
import Product from './model/product.model.js';
import mongoose from 'mongoose';

const app = express();
app.use(express.json()); // make it accept JSON data in the req.body

app.get("/api/products",async (req,res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success:true , data:products});
    } catch (error) {
        console.log("Error in fetching products:", error.message);  //for debug
        res.status(500).json({ success:false, message:"Server Error"});
    }
});

app.post("/api/products", async (req,res) => {      //request & response
    const product = req.body;

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({ success: false, message: "Please provide all fields"});
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct});
    } catch (error) {
        console.error("Error in Create product:", error.message);  //for debug
        res.status(500).json({ success: false, message: "Server Error"});
    }
}); //postman for backend testing

app.put("/api/products/:id", async (req,res) => {       // app.patch is for updating some field, put for all field
    const {id} = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){   // make sure the id is found
        return res.status(404).json({success:false, message:"Invalid Product Id"});
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({success:true, data:updatedProduct});
    } catch (error) {
        console.log("Error in updating products:", error.message); // for debug
        res.status(500).json({success:false, message:"Server Error"});
    }
});

app.delete("/api/products/:id/", async (req,res) => {
    const {id} = req.params;
    // console.log("testid: ", id);   //test
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted"});
    } catch (error) {
        console.log("Error in deleting products:", error.message);  //for debug
        res.status(404).json({ success: false, message: "Product not found"});
    }
});

app.listen(5010,()=>{
    connectDB();
    console.log("Server started at http://localhost:5010");
});

// const express = require('express');
import express from 'express';
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.get("/products",(req,res) => {      //request & response
    // res.send("Server is ready");
})

app.listen(5010,()=>{
    console.log("Server started at http://localhost:5010");
})

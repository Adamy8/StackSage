import Product from "../model/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req,res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success:true , data:products, message: "Get successfully!"});
    } catch (error) {
        console.log("Error in fetching products:", error.message);  //for debug
        res.status(500).json({ success:false, message:"Server Error"});
    }
}

export const createProduct = async (req,res) => {      //request & response
    const product = req.body;

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({ success: false, message: "Please provide all fields"});
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct, message: "Created successfully!"});
    } catch (error) {
        console.error("Error in Create product:", error.message);  //for debug
        res.status(500).json({ success: false, message: "Server Error"});
    }
}

export const updateProduct = async (req,res) => {       // router.patch is for updating some field, put for all field
    const {id} = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){   // this only check if id is valid MongoDB id, dont check existance
        return res.status(400).json({success:false, message:"Invalid Product ID"});
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        if (!updatedProduct) {          //existance check
            return res.status(404).json({ success: false, message: "updateProduct not found" });
        }
        res.status(200).json({success:true, data:updatedProduct, message:"Updated successfully!"});
    } catch (error) {
        console.log("Error in updating products:", error.message); // for debug
        res.status(500).json({success:false, message:"Server Error"});
    }
}

export const deleteProduct = async (req,res) => {
    const {id} = req.params;
    // console.log("testid: ", id);   //debug
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid product ID" });
    }
    try {
        const product = await Product.findById(id);
        if(!product){   //make sure product is found
            return res.status(404).json({ success: false, message: 'deleteProduct not found' });
        }

        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted"});
    } catch (error) {
        console.log("Error in deleting products:", error.message);  //for debug
        res.status(500).json({ success: false, message: "Server Error"});
    }
}
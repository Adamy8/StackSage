import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
}, {
    timestamps: true // log  createdAt, updateAt
});

const Product = mongoose.model('Product', productSchema);
//mongoose will process 'Product' -> 'products', so we put Product here
export default Product;

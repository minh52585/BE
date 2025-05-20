import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
        },
        category: {
            type: String,
        },
        imageUrl: {
            type: String,
        },
        stock: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: ["available", "out of stock"],
            default: "available",
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
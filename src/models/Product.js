import mongoose from "mongoose";

const variantSchema = new mongoose.Schema(
    {
        format: {
            type: String,
            enum: ["Bìa cứng", "Bìa mềm"],
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
            default: 0,
        },
        sku: {
            type: String,
        },
    },
    {
        _id: false,
    }
);

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        category: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        variants: {
            type: [variantSchema],
            required: true,
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

const Product = mongoose.model("Product", productSchema);
export default Product;

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
        stock_qauantity: {
            type: Number,
            default: 0,
        },
        image_URL: {
            type: String,
            required: true,
        },
    },
    {
        _id: false,
    }
);
const Variant = mongoose.model("Variant", variantSchema);
export default Variant;
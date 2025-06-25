import mongoose from "mongoose";

const discountSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    discountPercent: { type: Number, required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    // Thêm các trường khác nếu cần
}, { timestamps: true });

const Discount = mongoose.model("Discount", discountSchema);
export default Discount;
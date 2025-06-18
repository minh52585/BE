import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "shipped", "delivered", "cancelled"],
        required: true,
        default: "pending"
    },
    coupons_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Coupon",
        required: false,
        default: null,
    },
    total_amount: {
        type: Number,
        required: true,
        default: 0
    }
});

const Order = mongoose.model("Order", orderSchema)
export default Order
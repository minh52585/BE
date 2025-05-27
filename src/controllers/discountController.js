import Discount from "../models/discountModel.js";
import mongoose from "mongoose";

export const getAllDiscounts = async (_req, res, next) => {
    try {
        const discounts = await Discount.find();
        res.json({ success: true, data: discounts });
    } catch (error) {
        next(error);
    }
};
export const getDiscountById = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: "ID mã giảm giá không hợp lệ",
        });
    }

    try {
        const discount = await Discount.findById(id);
        if (!discount) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy mã giảm giá",
            });
        }
        res.json({ success: true, data: discount });
    } catch (error) {
        next(error);
    }
};

export const addDiscount = async (req, res, next) => {
    try {
        const {  
            
            productID,
            variantID,
            discount_type,
            discount_value,
            status,
            date } = req.body;

        const existingDiscount = await Discount.findOne({ productID, variantID });
        if (existingDiscount) {
            return res.status(400).json({
                success: false,
                message: "Mã giảm giá đã tồn tại",
            });
        }

        // const products = await Product.findById(product);
        // if (!product) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "Sản phẩm không tồn tại",
        //     });
        // }

        const newDiscount = new Discount({
           
            productID,
            variantID,
            discount_type,
            discount_value,
            status,
            date
        });

        await newDiscount.save();
        res.status(201).json({
            success: true,
            data: newDiscount,
        });
    } catch (error) {
        next(error);
    }
};
export const updateDiscount = async (req, res, next) => {
    try {
        const {  
            
            productID,
            variantID,
            discount_type,
            discount_value,
            status,
            date } = req.body;

        const existingDiscount = await Discount.findOne({ productID, variantID });
        if (existingDiscount && existingDiscount._id.toString() !== req.params.id) {
            return res.status(400).json({
                success: false,
                message: "Mã giảm giá đã tồn tại",
            });
        }

        // const product = await Product.findById(productID);
        // if (!product) {
        //     return res.status(404).json({
        //         success: false,
//         message: "Sản phẩm không tồn tại",
        //     });
        // }

        const updatedDiscount = await Discount.findByIdAndUpdate(
            req.params.id,
            {  
            productID,
            variantID,
            discount_type,
            discount_value,
            status,
            date
         },
            { new: true }
        );

        if (!updatedDiscount) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy mã giảm giá",
            });
        }

        res.json({
            success: true,
            data: updatedDiscount,
        });
    } catch (error) {
        next(error);
    }
};
export const deleteDiscount = async (req, res, next) => {
    try {
        const deletedDiscount = await Discount.findByIdAndDelete(req.params.id);
        if (!deletedDiscount) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy mã giảm giá",
            });
        }
        res.json({
            success: true,
            message: "Xóa mã giảm giá thành công",
        });
    } catch (error) {
        next(error);
    }
};
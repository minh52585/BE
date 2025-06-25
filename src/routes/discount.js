import { Router } from "express";
import {
    getAllDiscounts,
    getDiscountById,
    addDiscount,
    updateDiscount,
    deleteDiscount,
} from "../controllers/discountController.js";

const router = Router();

// API discount 
router.get("/discounts", getAllDiscounts);
router.get("/discounts/:id", getDiscountById);
router.post("/discounts/add", addDiscount);
router.put("/update/:id", updateDiscount);
router.delete("/delete/:id", deleteDiscount);

export default router;
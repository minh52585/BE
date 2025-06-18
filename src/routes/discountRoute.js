import {
    getAllDiscounts,
    getDiscountById,
    addDiscount,
    updateDiscount,
    deleteDiscount,
} from "../controllers/discountController.js";
import express from 'express'
const routes = express.Router();

routes.get("/", getAllDiscounts);
routes.post("/add", addDiscount);
routes.get("/:id", getDiscountById);
routes.put("/:id", updateDiscount);
routes.delete("/:id", deleteDiscount);

export default routes
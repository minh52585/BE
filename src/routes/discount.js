import { Router } from "express";
import routes from "./index.js";
import {
    getAllDiscounts,
    getDiscountById,
    addDiscount,
    updateDiscount,
    deleteDiscount,
} from "../controllers/discountController.js";

const routes = Router();

//API discount 
routes.get("/discounts", getAllDiscounts);
routes.get("/discounts/:id", getDiscountById);
routes.post("/discounts/add", addDiscount);
routes.put("/update/:id", updateDiscount);
routes.delete("/delete/:id", deleteDiscount);

export default discountRoutes;
const discountRoutes = routes;
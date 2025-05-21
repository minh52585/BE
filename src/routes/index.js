import { Router } from "express";

import {
    getAllDiscounts,
    getDiscountById,
    addDiscount,
    updateDiscount,
    deleteDiscount,
} from "../controllers/discountController.js";

import {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/productController.js";

const routes = Router();

routes.get("/discounts", getAllDiscounts);
routes.get("/discounts/:id", getDiscountById);
routes.post("/discounts/add", addDiscount);
routes.put("/update/:id", updateDiscount);
routes.delete("/delete/:id", deleteDiscount);

routes.get("/product", getAllProducts);
routes.get("/product/:id", getProductById);
routes.post("/products/add", addProduct);
routes.put("/update/:id", updateProduct);
routes.delete("/delete/:id", deleteProduct);

export default routes;

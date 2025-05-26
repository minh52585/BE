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

import {
    getAllOrders,
    getOrderById,
    addOrder,
    updateorder,
    deleteOrder,
} from "../controllers/orderController.js"
import {
    getAllCategories,
    getCategoryById,
    addCategory,
    updateCategory,
    deleteCategory,
} from "../controllers/categoryController.js";
const routes = Router();
//API discount 
routes.get("/discounts", getAllDiscounts);
routes.get("/discounts/:id", getDiscountById);
routes.post("/discounts/add", addDiscount);
routes.put("/update/:id", updateDiscount);
routes.delete("/delete/:id", deleteDiscount);
//API product
routes.get("/product", getAllProducts);
routes.get("/product/:id", getProductById);
routes.post("/products/add", addProduct);
routes.put("/update/:id", updateProduct);
routes.delete("/delete/:id", deleteProduct);
//API Order
routes.get("/order", getAllOrders);
routes.get("/order/:id", getOrderById);
routes.post("/orders/add", addOrder);
routes.put("/update/:id", updateorder);
routes.delete("/delete/:id", deleteOrder);
//category
routes.get("/categories", getAllCategories);
routes.get("/categories/:id", getCategoryById);
routes.post("/categories/add", addCategory);
routes.put("/categories/update/:id", updateCategory);
routes.delete("/categories/delete/:id", deleteCategory);
export default routes;

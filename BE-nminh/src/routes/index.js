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
    updateOrder,
    deleteOrder,
} from "../controllers/orderController.js";

const routes = Router();
//discounts
routes.get("/discounts", getAllDiscounts);
routes.get("/discounts/:id", getDiscountById);
routes.post("/discounts/add", addDiscount);
routes.put("/update/:id", updateDiscount);
routes.delete("/delete/:id", deleteDiscount);
//products
routes.get("/product", getAllProducts);
routes.get("/product/:id", getProductById);
routes.post("/products/add", addProduct);
routes.put("/update/:id", updateProduct);
routes.delete("/delete/:id", deleteProduct);
//Order
routes.get("/orders", getAllOrders);
routes.get("/orders/:id", getOrderById);
routes.post("/orders/add", addOrder);
routes.put("/orders/update/:id", updateOrder);
routes.delete("/orders/delete/:id", deleteOrder);
export default routes;

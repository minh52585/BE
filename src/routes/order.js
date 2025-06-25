import { Router } from "express";
import {
    getAllOrders,
    getOrderById,
    addOrder,
    updateorder,
    deleteOrder,
} from "../controllers/orderController.js";

const orderRoutes = Router();

// API Order
orderRoutes.get("/order", getAllOrders);
orderRoutes.get("/order/:id", getOrderById);
orderRoutes.post("/orders/add", addOrder);
orderRoutes.put("/update/:id", updateorder);
orderRoutes.delete("/delete/:id", deleteOrder);

export default orderRoutes;
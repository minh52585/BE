import { Router } from "express";
import {
    getAllOrders,
    getOrderById,
    addOrder,
    updateOrder,
    deleteOrder,
} from "../controllers/orderController.js";

const orderRoutes = Router();

// API Order
orderRoutes.get("/", getAllOrders);
orderRoutes.get("/:id", getOrderById);
orderRoutes.post("/add", addOrder);
orderRoutes.put("/:id", updateOrder);
orderRoutes.delete("/:id", deleteOrder);

export default orderRoutes;
import routes from "./index.js";
import { Router } from "express";
import {
    getAllOrders,
    getOrderById,
    addOrder,
    updateorder,
    deleteOrder,
} from "../controllers/orderController.js"
const routes = Router();
//API Order
routes.get("/order", getAllOrders);
routes.get("/order/:id", getOrderById);
routes.post("/orders/add", addOrder);
routes.put("/update/:id", updateorder);
routes.delete("/delete/:id", deleteOrder);

export default orderRoutes;
const orderRoutes = routes;

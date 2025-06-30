import { Router } from "express";
import {
  getAllOrders,
  getOrderById,
  addOrder,
  updateorder,
  deleteOrder,
} from "../controllers/orderController.js";

// ✅ Đặt tên đúng, không bị trùng
const orderRoutes = Router();

// ✅ Routes rõ ràng
orderRoutes.get("/", getAllOrders);
orderRoutes.get("/:id", getOrderById);
orderRoutes.post("/add", addOrder);
orderRoutes.put("/:id", updateorder);
orderRoutes.delete("/:id", deleteOrder);

export default orderRoutes;

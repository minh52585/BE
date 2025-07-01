import { Router } from "express";
import {
  getAllOrders,
  getOrderById,
  addOrder,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/orderController.js";
import { isAdmin, verifyToken } from "../middlewares/authMiddleware.js";

const orderRoutes = Router();

// ✅ Bắt buộc đăng nhập cho tất cả route dưới đây
orderRoutes.use(verifyToken);

// ✅ Admin xem tất cả đơn
orderRoutes.get("/", isAdmin, getAllOrders);

// ✅ Người dùng xem đơn của chính mình (check trong controller)
orderRoutes.get("/:id", getOrderById);

// ✅ Người dùng tạo đơn
orderRoutes.post("/", addOrder);

// ✅ Người dùng/ admin cập nhật đơn
orderRoutes.put("/:id", updateOrderStatus);

// ✅ Admin hoặc chủ đơn hàng có thể xóa (tuỳ điều kiện bạn thêm sau)
orderRoutes.delete("/:id", deleteOrder);

export default orderRoutes;

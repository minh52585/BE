import { Router } from "express";
import authController from "../controllers/authController.js";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";

const router = Router();
//AuthAuth
// Đăng ký và đăng nhập
router.post("/register", authController.register);
router.post("/login", authController.login);
//UserUser
// Lấy danh sách tất cả người dùng (cần xác thực, có thể kiểm tra quyền admin nếu muốn)
router.get("/users", verifyToken, authController.getAllUsers);

// Lấy thông tin người dùng theo ID
router.get("/users/:id", verifyToken, authController.getUserById);

// Cập nhật thông tin người dùng
router.put("/users/:id", verifyToken, authController.updateUser);

// Xoá người dùng (chỉ admin mới được xóa)
router.delete("/users/:id", verifyToken, isAdmin, authController.deleteUser);


// Gửi email đặt lại mật khẩu
router.post("/forgot-password", authController.forgotPassword);

// Xác nhận và đặt lại mật khẩu mới
router.post("/reset-password/:token", authController.resetPassword);

export default router;

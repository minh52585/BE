import { Router } from "express";
import authController from "../controllers/authController.js";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";
import { sendEmail } from "../utils/sendMail.js";

const routes = Router();

// Login & Register
routes.post("/register", authController.register);
routes.post("/login", authController.login);

// Forgot / Reset password
routes.post("/forgot-password", authController.forgotPassword);
routes.post("/reset-password/:token", authController.resetPassword);

// Get users (require login)
routes.get("/users", verifyToken, authController.getAllUsers);
routes.get("/users/:id", verifyToken, authController.getUserById);

// Update user (require login)
routes.put("/users/:id", verifyToken, authController.updateUser);

// Delete user (admin only)
routes.delete("/users/:id", verifyToken, isAdmin, authController.deleteUser);

export default routes;

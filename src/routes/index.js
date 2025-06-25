import { Router } from "express";
import productRoutes from "./product.js";
import discountRoutes from "./discount.js";
import categoryRoutes from "./category.js";
import orderRoutes from "./order.js";
import authController from "../controllers/authController.js";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";
import dotenv from "dotenv";

dotenv.config();

const routes = Router();

routes.use("/products", productRoutes);
routes.use("/discounts", discountRoutes);
routes.use("/categories", categoryRoutes);
routes.use("/orders", orderRoutes);

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
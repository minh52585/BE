// index.js
import { Router } from "express";
import authController from "../controllers/authController.js";

const routes = Router();

// Login & Register
routes.post("/register", authController.register);
routes.post("/login", authController.login);

// Get users
routes.get("/users", authController.getAllUsers);
routes.get("/users/:id", authController.getUserById);

// Update user
routes.put("/users/:id", authController.updateUser);

// Delete user
routes.delete("/users/:id", authController.deleteUser);

export default routes;

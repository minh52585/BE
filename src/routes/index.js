import { Router } from "express";
import authController from "../controllers/authController.js";

const routes = Router();
// API User

// Login & Register
routes.use("/register", authController.register);
routes.use("/login", authController.login);

// Get users
routes.use('/users', authController.getAllUsers);
routes.use('/users/:id', authController.getUserById);

//Update User
routes.use('/users/:id', authController.updateUser);

// Delete User
routes.use('/users/:id', authController.deleteUser);

// End API User

export default routes;

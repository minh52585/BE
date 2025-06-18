import {
    getAllCategories,
    getCategoryById,
    addCategory,
    updateCategory,
    deleteCategory,
} from "../controllers/categoryController.js";
import express from "express";

const routes = express.Router();
routes.get("/", getAllCategories);
routes.get("/:id", getCategoryById);
routes.post("/", addCategory);
routes.put("/:id", updateCategory);
routes.delete("/:id", deleteCategory);

export default routes
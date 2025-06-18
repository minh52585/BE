import routes from "./index.js";
import { Router } from "express";
import {
    getAllCategories,
    getCategoryById,
    addCategory,
    updateCategory,
    deleteCategory,
} from "../controllers/categoryController.js";
const routes = Router();
//category
routes.get("/categories", getAllCategories);
routes.get("/categories/:id", getCategoryById);
routes.post("/categories/add", addCategory);
routes.put("/categories/update/:id", updateCategory);
routes.delete("/categories/delete/:id", deleteCategory);

export default cactegoryRoutes;
const cactegoryRoutes = routes;
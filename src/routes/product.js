import routes from "./index.js";
import { Router } from "express";
import {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/productController.js";

const routes = Router();
//API product
routes.get("/product", getAllProducts);
routes.get("/product/:id", getProductById);
routes.post("/products/add", addProduct);
routes.put("/update/:id", updateProduct);
routes.delete("/delete/:id", deleteProduct);

export default productRoutes;
const productRoutes = routes;
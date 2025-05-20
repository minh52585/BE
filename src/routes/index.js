import { Router } from "express";
import ProductRouter from "./product.js";
import { addProduct, getAllProducts } from "../controllers/productController.js";

const routes = Router();

routes.use("/products", getAllProducts);
routes.use("/add", addProduct);

export default routes;

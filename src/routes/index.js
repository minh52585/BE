import { Router } from "express";
import { productRoutes } from "./product.routes.js";


const routes = Router();

// routes.use("/products", hanldeProduct...)
// routes.use("/products", hanldeProduct...)
// routes.use("/products", hanldeProduct...)
// routes.use("/products", hanldeProduct...)
routes.use("/", productRoutes);


export default routes;
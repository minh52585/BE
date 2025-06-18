import { Router } from "express";
import discountRoutes from "./discount.js";
import orderRoutes from "./order.js";
import productRoutes from "./product.js";
import categoryRoutes from "./category.js";

const routes = Router();
routes.use("/api/discounts", discountRoutes);
routes.use("/api/orders", orderRoutes);
routes.use("/api/products", productRoutes);
routes.use("/api/categories", categoryRoutes);


export default routes;

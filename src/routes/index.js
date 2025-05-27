import { Router } from "express";
import productRoutes from "../routes/productRoute.js";
import discountRoutes from "../routes/discountRoute.js";
import categoryRoutes from "../routes/categoryRoute.js";

const routes = Router();
routes.use("/products", productRoutes);
routes.use("/discounts", discountRoutes);
routes.use("/categories", categoryRoutes);

// routes.use("/products", hanldeProduct...)
// routes.use("/products", hanldeProduct...)
// routes.use("/products", hanldeProduct...)
// routes.use("/products", hanldeProduct...)
// routes.use("/products", hanldeProduct...)

export default routes;

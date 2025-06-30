import routes from "./index.js";
import { Router } from "express";
import {
    addVariant,
    updateVariant,
    deleteVariant,
    getAllVariants,
} from "../controllers/variantController.js";
const routes = Router();
//API variant
routes.get("/", getAllVariants);
routes.post("/add", addVariant);
routes.put("/:id", updateVariant);
routes.delete(":id", deleteVariant);
export default variantRoutes;
const variantRoutes = routes;
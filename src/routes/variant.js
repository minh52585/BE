import routes from "./index.js";
import { Router } from "express";
import {
    addVariant,
    updateVariant,
    deleteVariant,
} from "../controllers/variantController.js";
const variantRoutes = Router();
//API variant
routes.post("/variants/add", addVariant);
routes.put("/variants/update/:id", updateVariant);
routes.delete("/variants/delete/:id", deleteVariant);
export default variantRoutes;
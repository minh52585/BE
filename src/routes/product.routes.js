import { Router } from "express";
import {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
} from "../controllers/productController.js";

const router = Router();

router.get("/Products", getAllProducts);
router.get("/Poducts/:id", getProductById);
router.post("/Products/add", addProduct);
router.put("/Products/edit/:id", updateProduct);
router.delete("/Products/:id", deleteProduct);

export default router;
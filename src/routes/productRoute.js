import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import express from 'express';
const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/add', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
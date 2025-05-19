const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/add', productController.createProduct);
router.put('/edit/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;

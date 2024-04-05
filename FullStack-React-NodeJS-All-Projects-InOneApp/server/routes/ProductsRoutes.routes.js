const { addProductService, getProducts, deleteProduct, changeProduct } = require('../controllers/ProductsController');
require('dotenv').config();
const router = require('express').Router();
router.post('/add', addProductService);
router.get('/pull', getProducts);
router.post('/delete', deleteProduct);
router.post('/change', changeProduct);

module.exports = router ;
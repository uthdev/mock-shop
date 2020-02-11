import { Router } from 'express';
import ProductController from '../controllers/productController';
import Authenticate from '../middlewares/authenticate';
import ProductValidator from '../middlewares/productValidators';

const { verifyToken, verifyAdmin } = Authenticate;
const { addProductValidator, productIdValidator } = ProductValidator;
const { createProduct, deleteProduct } = ProductController;

const productRoute = new Router();

productRoute.post('/', verifyToken, verifyAdmin, addProductValidator, createProduct);
productRoute.delete('/:productId', verifyToken, verifyAdmin, productIdValidator, deleteProduct);

export default productRoute;

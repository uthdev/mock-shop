import { Router } from 'express';
import ProductController from '../controllers/productController';
import Authenticate from '../middlewares/authenticate';
import ProductValidator from '../middlewares/productValidators';

const { verifyToken, verifyAdmin } = Authenticate;
const { addProductValidator } = ProductValidator;
const { createProduct } = ProductController;

const productRoute = new Router();

productRoute.post('/', verifyToken, verifyAdmin, addProductValidator, createProduct);

export default productRoute;

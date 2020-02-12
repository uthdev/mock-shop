import { Router } from 'express';
import Authenticate from '../middlewares/authenticate';
import ProductValidator from '../middlewares/productValidators';
import CartController from '../controllers/cartController';

const { verifyToken } = Authenticate;
const { productIdValidator } = ProductValidator;
const { addToCart } = CartController;

const cartRoute = new Router();

cartRoute.post('/', verifyToken, productIdValidator, addToCart);

export default cartRoute;

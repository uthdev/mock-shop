import { Router } from 'express';
import Authenticate from '../middlewares/authenticate';
import ProductValidator from '../middlewares/productValidators';
import CartController from '../controllers/cartController';

const { verifyToken } = Authenticate;
const { productIdValidator, cartIdValidator } = ProductValidator;
const { addToCart, getCart, cartDelete } = CartController;

const cartRoute = new Router();

cartRoute.post('/', verifyToken, productIdValidator, addToCart);
cartRoute.get('/', verifyToken, getCart);
cartRoute.delete('/:cartId', verifyToken, cartIdValidator, cartDelete);

export default cartRoute;

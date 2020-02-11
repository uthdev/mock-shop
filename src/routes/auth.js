import { Router } from 'express';
import AuthController from '../controllers/authController';
import AccountValidator from '../middlewares/accountValidators';

const authRoute = new Router();

const { signUp, login } = AuthController;
const { registerValidator, loginValidator } = AccountValidator;


authRoute.post('/signup', registerValidator, signUp);
authRoute.post('/signin', loginValidator, login);

export default authRoute;

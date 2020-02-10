import { Router } from 'express';
import AuthController from '../controllers/authController';
import AccountValidator from '../middlewares/accountValidators';

const authRoute = new Router();

const { signUp } = AuthController;
const { registerValidator } = AccountValidator;


authRoute.post('/signup', registerValidator, signUp);

export default authRoute;

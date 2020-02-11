import { Router } from 'express';
import authRoute from './auth';
import productRoute from './product';


const router = new Router();

router.get('/api/v1/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Mock Shop API',
  });
});

router.use('/api/v1/auth', authRoute);
router.use('/api/v1/products', productRoute);


export default router;
import { Router } from 'express';
import authRoute from './auth';
import productRoute from './product';
import cartRoute from './cart';

const router = new Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Mock Shop API',
  });
});

router.use('/auth', authRoute);
router.use('/products', productRoute);
router.use('/carts', cartRoute);


export default router;

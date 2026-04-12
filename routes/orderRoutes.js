import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { createOrder } from '../controllers/orderController';


const router = express.Router();

router.post('/create-order', protect, authorize('staff'), createOrder);

export default router
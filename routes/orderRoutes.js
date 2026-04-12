import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { createOrder } from '../controllers/orderController.js';


const router = express.Router();

router.post('/create-order', protect, authorize('staff'), createOrder);

export default router
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { createOrder, getUserOrders } from '../controllers/orderController.js';


const router = express.Router();

router.post('/create-order', protect, authorize('staff'), createOrder);
router.get('/my-orders', protect, authorize('patient'), getUserOrders);

export default router
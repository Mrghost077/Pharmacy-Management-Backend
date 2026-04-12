import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { confirmOrder, createOrder, getUserOrders, markOrderReady } from '../controllers/orderController.js';


const router = express.Router();

router.post('/create-order', protect, authorize('staff'), createOrder);
router.get('/my-orders', protect, authorize('patient'), getUserOrders);
router.patch('/:id/confirm', protect, authorize('patient'), confirmOrder);
router.patch('/:id/ready', protect, authorize('staff'), markOrderReady);


export default router
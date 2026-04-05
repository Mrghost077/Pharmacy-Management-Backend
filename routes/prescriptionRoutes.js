import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../config/cloudinaryConfig.js';
import { uploadPrescription } from '../controllers/prescriptionsController.js';

const router = express.Router();

router.post('/upload', protect, upload.single('prescription'), uploadPrescription);

export default router;
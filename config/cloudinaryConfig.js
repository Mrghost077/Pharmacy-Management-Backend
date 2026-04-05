import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Set up storage for RevenantRx
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder: 'RevenantRx_Prescriptions',
        allowed_formats: ['jpg', 'png', 'jpeg', 'pdf'],
        transformation: [{
            width: 1000,
            height: 1000,
            crop: 'limit'
        }]
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 2 * 1024 * 1024 // 2MB
    },
    fileFilter: (req , file , cb ) => {

       if ( file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'application/pdf'){
                cb(null, true);
            } else {
                cb (new Error("Unsupported file format! Please upload JPG, PNG, or PDF."), false);
            }
    }
});

export default upload;
import upload from "../config/cloudinaryConfig.js";
import multer from "multer";

const uploadPrescription = (req , res , next) => {
    const uploadInstance = upload.single('prescription');

    uploadInstance(req , res , (err) => {
        if (err instanceof multer.MulterError) {
            // Handle specific Multer errors
            return res.status(400).json({message : `Upload Error: ${err.message}`});
        } else if (err) {
            // Handle our Custom FIle Filter errors
            return res.status(400).json({message: err.message});
        }

        next();
    });
};

export{ uploadPrescription };
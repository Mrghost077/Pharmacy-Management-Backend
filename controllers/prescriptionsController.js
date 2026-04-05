import prescriptionModel from "../models/prescriptionModel.js";

// Upload Prescription
export const uploadPrescription = async (req , res) => {
    try {
        if (!req.file){
            return res.status(400).json({success: false, message: "No file Uploaded"})
        }

        // Create New entry in Database
        const newPrescription = new prescriptionModel({
            userId : req.user._id,
            imageUrl: req.file.path,
            publicId: req.file.filename
        });

        await newPrescription.save();

        return res.status(201).json({ success: true, message: "Prescription Uploaded Successfully"});
    } catch (error) {
        return res.status(500).json({success: false, message: error.message});
    }
};
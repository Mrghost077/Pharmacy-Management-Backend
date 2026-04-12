import orderModel from "../models/orderModel.js";
import prescriptionModel from "../models/prescriptionModel.js";

export const createOrder = async (req , res) => {
    try {
        const {prescriptionId, items, totalAmount, durationInDays} = req.body;

        const prescription = await  prescriptionModel.findById(prescriptionId);

        if (!prescription){
            return res.status(400).json({success: false , message : "Prescription not found. Unable to create order"})
        }

        //create New order
        const newOrder = new orderModel({
            userId : prescription.userId,
            prescriptionId : prescription._id,
            items,
            totalAmount,
            durationInDays,
            orderStatus: "quote-sent"
        });

        await newOrder.save();

        await prescriptionModel.findByIdAndUpdate(prescriptionId, {status : 'approved'});

        return res.status(201).json({success : true, message: "Quote Sent", order : newOrder});

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
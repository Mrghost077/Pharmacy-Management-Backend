import orderModel from "../models/orderModel.js";
import prescriptionModel from "../models/prescriptionModel.js";

export const createOrder = async (req , res) => {
    try {
        const {prescriptionId, userId, items, totalAmount, durationInDays} = req.body;

        //create New order
        const newOrder = new orderModel({
            userId,
            prescriptionId,
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
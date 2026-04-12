import orderModel from "../models/orderModel.js";
import prescriptionModel from "../models/prescriptionModel.js";

// create order by staff
export const createOrder = async (req , res) => {
    try {
        const {prescriptionId, items, totalAmount, durationInDays} = req.body;

        const prescription = await  prescriptionModel.findById(prescriptionId);

        if (!prescription){
            return res.status(400).json({success: false , message : "Prescription not found. Unable to create order"})
        }

        let calculatedTotal = 0;

        // calculate total and subtotal
        const calculatedItems = items.map(item => {
            const subTotal = item.unitPrice * item.quantityRequested;
            calculatedTotal += subTotal;

            return {... item, subTotal : subTotal};
        });


        //create New order
        const newOrder = new orderModel({
            userId : prescription.userId,
            prescriptionId : prescription._id,
            items : calculatedItems,
            totalAmount: calculatedTotal,
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

// Get all orders by Patient
export const getUserOrders = async (req , res) =>{
    try {
        const orders = await orderModel.find({userId : req.user._id})
        .populate('prescriptionId', 'imageUrl status')
        .sort({createdAt : -1}); // sort newset first

        if (!orders){
            return res.json({message : "You dont have any orders yet"})
        }

        return res.status(200).json({
            success : true,
            results : orders.length,
            data : orders
        })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// Respond to quote by patient
export const confirmOrder = async (req , res) => {
    try {
        const {status} = req.body;
        const orderId = req.params.id;

        const order = await orderModel.findOne({_id : orderId, userId : req.user._id});

        if(!order){
            return res.status(404).json({success: false, message : "Something went Wrong. Order cannot be identified"})
        }

        orderModel.orderStatus = status;
        await orderModel.save();

        return res.status(200).json({
            success: true,
            message : status === 'confirmed' ? "Order confirmed! Staff will prepare it now." : "Order rejected."
        });
        
    } catch (error) {
       return res.status(500).json({ message: error.message });
    }
}
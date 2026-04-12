import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true
    },

    prescriptionId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "prescription",
        required : true
    },

    // patients Input
    patientNotes : {
        type : String,
        maxlength : 500
    },

    durationInDays : Number,

    items : [{
        name : String,
        brandName : String,
        isGeneric : {
            type : Boolean,
            default : false
        },
        unitPrice : Number,
        quantityRequested : Number,
        subTotal : Number
    }],

    totalAmount : Number,
    orderStatus : {
        type: String,
        enum: ["awaiting-quote", "quote-sent", "rejected", "paid", "processing", "delivered"],
        default: 'awaiting-quote'
    },
}, {timestamps : true});

const orderModel = mongoose.models.order || mongoose.model('order', orderSchema);

export default orderModel;
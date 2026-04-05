import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
  userId : {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: true
  },

  imageUrl : {type: String, required: true},
  publicId: {type: String},
  status : {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  } 
});

const prescriptionModel = mongoose.models.prescription || mongoose.model('prescription', prescriptionSchema);

export default prescriptionModel;
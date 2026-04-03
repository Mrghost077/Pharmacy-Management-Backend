import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
  userId : ObjectId,
  imageUrl : {type: String},
  status : {type: String, default: "pending"},
  createdAt: Date  
});

const prescriptionModel = mongoose.models.prescription || mongoose.model('prescription', prescriptionSchema);

export default prescriptionModel;
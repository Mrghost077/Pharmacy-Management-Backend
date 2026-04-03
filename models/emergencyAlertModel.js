import mongoose from "mongoose";

const emergencySchema = new mongoose.schema({
    userId: ObjectId,
    loacation: {
        lat: Number,
        lng: Number,
    },
    createdAt: Date
})

const emergencyAlertModel = mongoose.models.emergencyAlerts || mongoose.model('emergencyAlerts', emergencySchema);

export default emergencyAlertModel;
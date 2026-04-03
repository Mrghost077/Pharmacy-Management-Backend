import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name : {type: String, required : true},
    email : {type: String, required : true},
    password : {type : String, required : true},
    phoneNum : {type: Number, required : true},

    role : {
        type : String,
        enum: ["patient", "staff"],
        required : true
    }
});

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;
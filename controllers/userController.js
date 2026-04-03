import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

// Register New User
export const registerUser = async (req , res) =>{
    try{
        const { name, email, password, phoneNum, role} = req.body;

        if (!name || !email || !password || !role || !phoneNum){
            return res.status(422).json({success: false , message: "missing required details"});

        }

        const userExist = await userModel.findOne({email});

        if(userExist){
            return res.status(409).json({success: false, message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            name,
            email,
            password : hashedPassword,
            role,
            phoneNum
        });

        res.status(201).json({
            success: true,
            message : "User registered Successfully",
            userId: user._id
        });

    } catch(error) {
        res.status(500).json({success: false, message: error.message});
    }
};

// User Login
export const loginUser = async (req , res) => {
    try{

        const { email, password } = req.body;

        if (!email || !password){
            return res.status(422).json({success: false, message: "Email and Password are both required to login"});

        }

        const user = await userModel.findOne({email});
        if(!user){
            return res.status(401).json({success: false, message: "Invalid email"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({success: false, message: "Invalid Password"});
        }

        const token = jwt.sign(
            {id: user._id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        );

        return res.status(200).json({success: true, message: "Login Successful", token});
    }catch(error){
        return res.status(500).json({success: false, message: error.message});
    }
};
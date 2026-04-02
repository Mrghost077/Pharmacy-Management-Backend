import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/mongodb.js";

// Load environment Variables 
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3301;
connectDB();

// MiddleWares
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.get('/', (req , res) => {
    res.json({message: 'Pharmacy API is Running..'});
});

/* 404 */
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.listen(PORT,  () => {
    console.log(`Server is running on port ${PORT}`);
});
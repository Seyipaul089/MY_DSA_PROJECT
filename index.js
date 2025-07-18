import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDb from "./config/Mongodb.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import ProfileRoutes from "./routes/profileRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config(); 

const app = express();

app.use(express.json());
app.use(cookieParser())

const allowOrigin = ["https://my-dsaprj-frontend.vercel.app/", "http://localhost:5174/"]
app.use(cors({
    origin:"",
    credentials:true,
    methods:["POST", "GET", "PUT", "DELETE"],
    allowedHeaders:["content-type", "Authorization"]
}))
app.use("/api/auth/", AuthRoutes);
app.use("/api/Profile", ProfileRoutes);
//connecting to database

app.get("/", (req, res)=>{
    res.json({message:"welcome to dsa backend"})
})

connectDb();

app.listen(8000, ()=>{
    console.log("server is running")
})

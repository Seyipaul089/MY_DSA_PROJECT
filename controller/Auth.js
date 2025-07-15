//Users registration section
import express from "express";
import AuthModel from "../models/authschema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const register = async (req, res) =>{
    const salt = 10
    try{
        const {name, email, password, role} = req.body;
        if(!name || !email || !password || !role){
            return res.status(400).json({message:"All fields are reqired"});
        }
        //To check if users already exist
        const existUser = await AuthModel.findOne({email});

        if(existUser){
            return res.status(400).json({message:"User already exist"});
        }
        //For hash password

        const hashPassword = await bcrypt.hash(password, salt)

        // create subscriber 

        const user = new AuthModel({
            name,
            email,
            password:hashPassword,
            role
        })  
        // Save subscriber to database
        await user.save();

        //To generate token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY,{
            expiresIn:"3d"
        })
        res.cookie("token", token,{
            httpOnly:true,
            secure:true,
            sameSite:"strict",
            maxAge: 3 * 24 * 60 * 68 *1000 // 3days
        })
        return res.status(201).json({message: "User registerd successfully", user: {id: user._id, name,email, role}});

        //Continue with registration...
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Server error"});
    }
};
//Users login section
const login = async (req, res) =>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message:"Email and password are Required"});
        }
        const user = await AuthModel.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY,{
            expiresIn:"3d"
        })
        res.cookie("token", token, {
            httpOnly:true,
            secure:true,
            sameSite:"strict",
            maxAge: 3 * 24 * 60 * 60 * 1000 // 3days
        })
        return res.status(200).json({message:"Login successfully", user: {id: user._id, name: user.name, email: user.email, role: user.role}});

        // Continue Logging in

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Server error"});
    }
}
export{register, login};

//Users logout section
const logout = async(req, res)=>{
    try {
        res.clearCookie("token", {
            httpOnly:true,
            secure:true,
            sameSite:"strict",
        })
        return res.status(200).json({message:"Logout successfully"});

    } catch (error) {
        res.json({message:"server error"});
        console.log(error)
    }
}

// User data
const getUserData = async(req, res)=>{

    try {
        const {id} = req.params;

        const UserData = await AuthModel.findById(id).select("-password");
        if(!userData){
            return res.status(404).json({message: "User not found"});
        }
        return res.status(200).json({userData});
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "server error"});
    }

}



export{logout,getUserData}
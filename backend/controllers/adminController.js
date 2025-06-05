import validator from "validator";
import bcrypt from "bcrypt";
import {v2 as cloudinary} from "cloudinary";
import doctormodel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";

const addDoctor = async (req, res) => {
    try{
        const {fullname ,email,password,speciality,degree,experience,about,fees,address} = req.body;
        const imageFile = req.file;

        if(!fullname || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
            return res.status(400).json({error:"All fields are required"});
        }

        if(!validator.isEmail(email)){
            return res.status(400).json({error:"Invalid email"});
        }

        if(password.length < 8){
            return res.status(400).json({error:"Password must be at least 8 characters"});
        }

        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"});
        const imageUrl=imageUpload.secure_url;

        const doctorData={
            fullname,
            email,
            password:hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address,
            image:imageUrl,
            date:Date.now()
        }
        const newDoctor=new doctormodel(doctorData);
        const savedDoctor=await newDoctor.save();
        res.status(201).json({doctor:savedDoctor});

    }
    catch(error){
        console.log(error);
    }
}

const adminLogin=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token=jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({
                success:true,
                message:"Admin logged in successfully",
                token
            })
        }else{
            res.status(400).json({message:"Invalid credentials"});
        }

    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error"});

        
    }
};


export {addDoctor,adminLogin}
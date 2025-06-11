import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import doctormodel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken'; 
import User from '../models/userModel.js';
import appointmentModel from '../models/appointmentModel.js';

const addDoctor = async (req, res) => {


  try {
    const {
      fullName,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      available,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Image is required' });
    }

    // All fields required
    if (
      !fullName ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      typeof experience === 'undefined' ||
      !about ||
      typeof fees === 'undefined' ||
      !address ||
      typeof available === 'undefined'
    ) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email' });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

// ✅ Upload the file from local temp path to Cloudinary
const cloudinaryUpload = await cloudinary.uploader.upload(req.file.path, {
  folder: 'doctors', // Optional: create a folder in Cloudinary
  resource_type: 'image',
});

// ✅ This is the Cloudinary image URL you’ll save in DB
const imageUrl = cloudinaryUpload.secure_url;


    const doctorData = {
      fullName,
      email,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      available,
      image: imageUrl,
      date: Date.now(),
    };

    const newDoctor = new doctormodel(doctorData);
    const savedDoctor = await newDoctor.save();

    return res.status(201).json({ success: true, doctor: savedDoctor });
  } catch (error) {
    console.error('Error adding doctor:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });
      return res.json({ success: true, message: 'Admin logged in', token });
    } else {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('adminLogin error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const allDoctors=async(req,res)=>{
  try {
    const doctors=await doctormodel.find({}).select('-password');
    return res.status(200).json({success:true,doctors});
  } catch (error) {
    return res.status(500).json({success:false,message:error.message});
  }
}

export const dashboarddata=async(req,res)=>{
  try {
    const doctors=await doctormodel.find({}).select('-password');
    const users=await User.find({}).select('-password');
    const appointments=await appointmentModel.find({}).select('-password');
    return res.status(200).json({success:true,doctors,users,appointments});
  } catch (error) {
    return res.status(500).json({success:false,message:error.message});
  }
}

export { addDoctor, adminLogin,allDoctors };

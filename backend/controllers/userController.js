import User from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctormodel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";



const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const registerUser = async (req, res) => {
  try {
    const { email, fullName, password } = req.body;

    // Validate input fields
    if (!email || !fullName || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Hash the password before storing
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await User.create({ fullName, email, password: hash });

    // Generate JWT token
    const token = createToken(user._id);

    return res.status(201).json({ success: true, message: "User registered", token, userId: user._id });
  } catch (err) {
    console.error("Register User Error:", err);
    return res.status(500).json({ success: false, message: "Server error during registration" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id);
    return res.json({ success: true, message: "Login successful", token, userId: user._id });
  } catch (err) {
    console.error("Login User Error:", err);
    return res.status(500).json({ success: false, message: "Server error during login" });
  }
};

export const getProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
    }

    const userId = req.user.id;
    const userData = await User.findById(userId).select("-password");

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.json({ success: true, userData });
  } catch (err) {
    console.error("Get Profile Error:", err);
    return res.status(500).json({ success: false, message: "Server error while fetching profile" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
    }

    const { fullName, phone, address, dob, gender } = req.body;
    const userId = req.user.id;

    if (!fullName || !phone || !address || !dob || !gender) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const updates = { fullName, phone, address, dob, gender };

    // Handle image upload if provided
    if (req.file) {
      try {
        const uploadRes = await cloudinary.uploader.upload(req.file.path, {
          resource_type: "image",
        });
        updates.image = uploadRes.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary Upload Error:", uploadError);
        return res.status(500).json({ success: false, message: "Image upload failed" });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.json({ success: true, userData: updatedUser });
  } catch (err) {
    console.error("Update Profile Error:", err);
    return res.status(500).json({ success: false, message: "Server error while updating profile" });
  }
};

export const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;

   // console.log("➡️ bookAppointment called with:", req.body);

    const docDataRaw = await doctormodel.findById(docId).select('-password');
    if (!docDataRaw) {
     // console.log("❌ Doctor not found");
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    if (!docDataRaw.available) {
    
      console.log("⚠️ Doctor not available");
      return res.status(400).json({ success: false, message: "Doctor is not available" });
    }

    let slots_booked = docDataRaw.slots_booked || {};
    if (slots_booked[slotDate]) {
      console.log("this dayyy");
      if (slots_booked[slotDate].includes(slotTime)) {
        console.log("⚠️ Slot already booked");
       // toast.error("Slot is already booked");
        return res.status(200).json({ success: false, message: "Slot is already booked" });
      } else {
        console.log("linewwwwww");
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [slotTime];
    }
    console.log("linewwwwww");
    const userData = await User.findById(userId).select('-password');
    if (!userData) {
     // console.log("❌ User not found");
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const docData = docDataRaw.toObject();
    delete docData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      slotDate,
      slotTime,
      userData,
      docData,
      amount: docData.fees,
      date: Date.now(),
    };

//    console.log("📝 Saving appointment:", appointmentData);

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

   // console.log("✅ Appointment saved. Updating doctor slots...");
    await doctormodel.findByIdAndUpdate(docId, { slots_booked });

 //   console.log("✅ Doctor updated");
 const doctordata=await doctormodel.findById(docId)
    console.log(doctordata);
    return res.status(200).json({ success: true, appointmentId: newAppointment._id });
   
  } catch (error) {
   // console.error("🔥 ERROR in bookAppointment:", error);
    return res.status(500).json({ success: false, message: "Server error while booking appointment" });
  }
};

export const listAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const appointments = await appointmentModel.find({userId});
    return res.status(200).json({ success: true, appointments });
  } catch (error) {
    console.error("🔥 ERROR in listAppointment:", error);
    return res.status(500).json({ success: false, message: "Server error while listing appointments" });
  }
};

export const cancelAppointment=async(req,res)=>{
  try{
    const {appointmentId}=req.body
    const userId=req.user.id
    const appointment=await appointmentModel.findById(appointmentId)
    if(appointment.userId!==userId){
      return res.status(401).json({success:false,message:"Unauthorized: Invalid token"});
    }
    else{
      await appointmentModel.findByIdAndDelete(appointmentId,{cancelled:true})
      const {docId,slotDate,slotTime}=appointment
      const docdata=await doctormodel.findById(docId)
      const slots_booked=docdata.slots_booked
      if(slots_booked[slotDate]){
        slots_booked[slotDate]=slots_booked[slotDate].filter((time)=>time!==slotTime)
        await doctormodel.findByIdAndUpdate(docId,{slots_booked})
      }
      return res.status(200).json({success:true,message:"Appointment cancelled"})

    }
  }
  catch(error){
    console.error("🔥 ERROR in cancelAppointment:", error);
    return res.status(500).json({ success: false, message: "Server error while cancelling appointment" });
  }
}
   
import doctormodel from '../models/doctorModel.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js';


const changeAvailability = async (req, res) => {
    try{
        const {docId}=req.body;
        console.log(docId);
        const docData=await doctormodel.findById(docId)
        await doctormodel.findByIdAndUpdate(docId,{available:!docData.available})
        console.log(docData.available);
        return res.status(200).json({success:true})
    }catch(err){
        return res.status(500).json({success:false,message:err.message})    

    }
    }

    const doctorList = async (req, res) => {
        try{    
            const doctors=await doctormodel.find({}).select('-password');
            return res.status(200).json({success:true,doctors});
        } catch (error) {
            return res.status(500).json({success:false,message:error.message});
        }
    }

    export const loginDoctor = async (req, res) => {
       try{
        const {email,password}=req.body
        const docData=await doctormodel.findOne({email})
        if(!docData){
            return res.status(400).json({success:false,message:"Invalid credentials"})
        }
        const isMatch=await bcrypt.compare(password,docData.password)
        if(!isMatch){
            return res.status(400).json({success:false,message:"Invalid credentials"})
        }
        else{
            const token=jwt.sign({id:docData._id},process.env.JWT_SECRET)
            return res.status(200).json({success:true,token})
        }
       }catch(err){
        return res.status(500).json({success:false,message:err.message})
        }
       } 

export const appointmentsDoctor=async(req,res)=>{
    try{
        const docId=req.user.id
      //  console.log("hello",docId);
        const appointments=await appointmentModel.find({docId})
       // console.log(appointments);
        return res.status(200).json({success:true,appointments})
    }catch(err){
        return res.status(500).json({success:false,message:err.message})
    }
}




export const cancelappointment = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: "Appointment ID is required" });
    }

    const appointment = await appointmentModel.findById(id);

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    if (appointment.cancelled) {
      return res.status(400).json({ success: false, message: "Appointment already cancelled" });
    }

    // Update the appointment directly
    await appointmentModel.findByIdAndUpdate(id, { cancelled: true });

    return res.status(200).json({ success: true, message: "Appointment cancelled successfully" });
  } catch (err) {
    console.error("Error cancelling appointment:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const appointmentcomplete=async(req,res)=>{
    try{
        const {id}=req.body
        await appointmentModel.findByIdAndUpdate(id,{isCompleted:true})
        return res.status(200).json({success:true})
    }catch(err){
        return res.status(500).json({success:false,message:err.message})
    }
}


export const getDoctorProfile = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const doctor = await doctormodel.findById(decoded.id).select('-password');

    if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found' });

    res.json({ success: true, doctor });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Toggle availability
export const updateDoctorAvailability = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const doctor = await doctormodel.findById(decoded.id);
    if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found' });

    doctor.available = !doctor.available;
    await doctor.save();

    res.json({ success: true, available: doctor.available });
  } catch (error) {
    console.error('Toggle availability error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update profile
export const updateDoctorProfile = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const updates = req.body;
    const doctor = await doctormodel.findByIdAndUpdate(decoded.id, updates, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found' });

    res.json({ success: true, doctor });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export {changeAvailability,doctorList}
 
import doctormodel from '../models/doctorModel.js';


const changeAvailability = async (req, res) => {
    try{
        const {docId}=req.body
        const docData=await doctormodel.findById(docId)
        await doctormodel.findByIdAndUpdate(docId,{available:!docData.available})
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
export {changeAvailability,doctorList}


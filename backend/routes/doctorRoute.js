import express from 'express';
import { doctorList } from '../controllers/doctorController.js';
import { loginDoctor } from '../controllers/doctorController.js';
import { appointmentsDoctor } from '../controllers/doctorController.js';
import authDoctor from '../middleware/authDoctor.js';
import { cancelappointment } from '../controllers/doctorController.js';
import { appointmentcomplete } from '../controllers/doctorController.js';
import { getDoctorProfile } from '../controllers/doctorController.js';
import { updateDoctorAvailability,updateDoctorProfile } from '../controllers/doctorController.js';
const DoctorRouter = express.Router();

DoctorRouter.get('/list', doctorList);
DoctorRouter.post('/login', loginDoctor);
DoctorRouter.get('/appointments',authDoctor, appointmentsDoctor);
DoctorRouter.post('/cancel-appointment',authDoctor, cancelappointment);
DoctorRouter.post('/complete-appointment',authDoctor, appointmentcomplete);
DoctorRouter.get('/profile',authDoctor, getDoctorProfile);
DoctorRouter.post('/update-profile',authDoctor, updateDoctorProfile);
DoctorRouter.post('/update-availability',authDoctor, updateDoctorAvailability);


export default DoctorRouter;
import express from 'express';
import { doctorList } from '../controllers/doctorController.js';

const DoctorRouter = express.Router();

DoctorRouter.get('/list', doctorList);


export default DoctorRouter;
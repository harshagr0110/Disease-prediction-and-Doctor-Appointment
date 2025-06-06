import express from 'express';
import { upload } from '../middleware/multer.js';
import { addDoctor, adminLogin } from '../controllers/adminController.js';
import adminAuth from '../middleware/authAdmin.js';
import { allDoctors } from '../controllers/adminController.js';
import { changeAvailability } from '../controllers/doctorController.js';

const adminRouter = express.Router();

// ✅ Ensure image field is processed and token is verified
adminRouter.post('/add-doctor', adminAuth, upload.single('image'), addDoctor);
adminRouter.post('/login', adminLogin);
adminRouter.get('/all-doctors', adminAuth, allDoctors);
adminRouter.post('/change-availability', adminAuth, changeAvailability);
export default adminRouter;

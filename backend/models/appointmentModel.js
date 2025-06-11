import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  docId: {
    type: String,
    required: true,
  },
  slotDate: {
    type: String,
    required: true,
  },
  slotTime: {
    type: String,
    required: true,
  },
  userData: {
    type: Object,
    required: true,
  },
  docData: {
    type: Object,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  cancelled: {
    type: Boolean,
    default: false
  },
  paymentStatus: {  // Changed from 'payment' to be more descriptive
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });  // Added timestamps for createdAt and updatedAt

export default mongoose.model('appointment', appointmentSchema);  // Capitalized model name
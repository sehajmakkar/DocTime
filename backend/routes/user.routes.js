import express from "express";
import { bookAppointment, getProfile, loginUser, registerUser, updateProfile, listAppointments, cancelAppointment, paymentRazorpay, verifyRazorpay } from "../controllers/user.controller.js";
import { authUser } from "../middlewares/user.middleware.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/get-profile", authUser, getProfile);
router.post("/update-profile", upload.single("image"), authUser, updateProfile);
router.post("/book-appointment", authUser, bookAppointment);
router.get("/appointments", authUser, listAppointments);
router.post("/cancel-appointment", authUser, cancelAppointment);

// APIs FOR RAZORPAY PAYMENT
// WILL IMPLEMENT AFTER I DO KYC.
router.post("/payment-razorpay", authUser, paymentRazorpay);
router.post("/verify-razorpay", authUser, verifyRazorpay);

export default router;
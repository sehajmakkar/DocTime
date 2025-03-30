import express from "express";
import { addDoctor, getAllDoctors, loginAdmin, appointmentsAdmin, appointmentCancel, adminDashboard } from "../controllers/admin.controller.js";
import { authAdmin } from "../middlewares/admin.middleware.js";
import upload from "../middlewares/multer.js";
import { changeAvailability } from "../controllers/doctor.controller.js";

const router = express.Router();

router.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
router.post("/login", loginAdmin);
router.get("/all-doctors", authAdmin, getAllDoctors);
router.put("/update-doctor-availability", authAdmin, changeAvailability);
router.get("/appointments", authAdmin, appointmentsAdmin);
router.post("/cancel-appointment", authAdmin, appointmentCancel);
router.get("/dashboard", authAdmin, adminDashboard);

export default router;

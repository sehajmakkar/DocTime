import express from "express";
import { doctorList, doctorLogin, getDoctorAppointments, appointmentComplete, appointmentCancel, doctorDashboard } from "../controllers/doctor.controller.js";
import { authDoctor } from "../middlewares/doctor.middleware.js";

const doctorRouter = express.Router();


doctorRouter.get("/all-doctors", doctorList);
doctorRouter.post("/login", doctorLogin);
doctorRouter.get("/appointments", authDoctor, getDoctorAppointments);
doctorRouter.post("/complete-appointment", authDoctor, appointmentComplete);
doctorRouter.post("/cancel-appointment", authDoctor, appointmentCancel);
doctorRouter.get("/dashboard", authDoctor, doctorDashboard);

export default doctorRouter;
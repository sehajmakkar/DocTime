import express from "express";
import { doctorList } from "../controllers/doctor.controller.js";

const doctorRouter = express.Router();


doctorRouter.get("/all-doctors", doctorList);

export default doctorRouter;
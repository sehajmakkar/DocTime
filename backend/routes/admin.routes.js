import express from "express";
import { addDoctor, loginAdmin } from "../controllers/admin.controller.js";
import { authAdmin } from "../middlewares/admin.middleware.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
router.post("/login", loginAdmin);

export default router;

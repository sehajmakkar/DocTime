import express from "express";
import { getProfile, loginUser, registerUser, updateProfile } from "../controllers/user.controller.js";
import { authUser } from "../middlewares/user.middleware.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/get-profile", authUser, getProfile);
router.post("/update-profile", upload.single("image"), authUser, updateProfile);

export default router;
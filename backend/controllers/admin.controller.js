import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import doctorModel from "../models/doctor.model.js";

// add doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      specialization,
      experience,
      fees,
      degree,
      about,
      address,
    } = req.body;
    // image is stored in req.file using multer
    const image = req.file;

    // create a new doctor
    // checking
    if (
      !name ||
      !email ||
      !password ||
      !specialization ||
      !experience ||
      !fees ||
      !degree ||
      !about ||
      !address ||
      !image
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // use validator package to validate fields
    // validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }

    // validate password
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        success: false,
        message: "Password is not strong enough",
      });
    }

    // encrypt password
    const hashedPassword = await bcrypt.hash(password, 12);

    // uplaod image to cloudinary
    const uploadedImage = await cloudinary.uploader.upload(image.path, {
      resource_type: "image",
    });
    const imageURL = uploadedImage.secure_url;

    // create a new doctor
    const newDoctor = new doctorModel({
      name,
      email,
      password: hashedPassword,
      specialization,
      experience,
      fees,
      degree,
      about,
      address: JSON.parse(address), // we get the address as object so we have to convert it to string
      image: imageURL,
      date: Date.now(),
    });

    await newDoctor.save();

    res.json({
      success: true,
      message: "Doctor added successfully",
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// admin auth
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // check if email matches
    if(email !== process.env.ADMIN_EMAIL) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // check if password matches
    if(password !== process.env.ADMIN_PASSWORD) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // generate token for admin
    const token = jwt.sign( email+password , process.env.JWT_SECRET)

    if(!token) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    res.json({
      token,
      success: true,
      message: "Admin logged in successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get all doctors
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find().select("-password");
    res.json({
      success: true,
      doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { addDoctor, loginAdmin, getAllDoctors };

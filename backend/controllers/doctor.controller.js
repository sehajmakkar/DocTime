import express from 'express';
import doctorModel from "../models/doctor.model.js";

// creating this here cuz we can need it in both doctor and admin controllers
// change availability of a doctor
const changeAvailability = async (req, res) => {
  try {

    const { doctorId } = req.body;
    const doctor = await doctorModel.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    doctor.available = !doctor.available;
    await doctor.save();
    
    return res.status(200).json({ success: true, message: `Doctor is now ${doctor.available ? 'available' : 'unavailable'}` });
    
    

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

const doctorList = async (req, res) => {
  try {

    const doctors = await doctorModel.find({}).select(["-password"
      , '-email']);

    return res.status(200).json({ success: true, doctors });


  } catch (error) {

    console.error(error); 
    return res.status(500).json({ success: false, message: error.message });

  }
}

export { changeAvailability, doctorList };
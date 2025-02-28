import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    fees: {
      type: Number,
      required: true,
    },
    available: {
      type: Boolean,
      default: true
    },
    degree: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    address: {
      type: Object,
      required: true,
      default: {},
    },
    date: {
      type: Date,
      default: Date.now,
    },
    slots_booked: {
      type: Object,
      default: {},
    },
  },
  {
    minimize: false,
    timestamps: true,
  }
);

const doctorModel = mongoose.model("doctor", doctorSchema);

export default doctorModel;

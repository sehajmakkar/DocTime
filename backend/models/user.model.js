import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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
      default: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
    },
    address: {
      type: Object,
      default: {
        line1: '',
        line2: '',
      },
    },
    gender: {
      type: String,
      default: "Not specified",
    },
    dob: {
      type: String,
      default: "Not specified",
    },
    phone: {
      type: String,
      default: "XXXXXXXXXX",
    },
  },
  {
    timestamps: true,
  },
  { typeKey: '$type' }
);

const userModel = mongoose.model("user", userSchema);
export default userModel;

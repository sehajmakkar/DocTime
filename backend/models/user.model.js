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
      type: String,
      default: {
        line1: "Not specified",
        line2: "Not specified",
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
  }
);

const userModel = mongoose.model("user", userSchema);
export default userModel;

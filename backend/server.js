import express from "express";
import cors from "cors";
import 'dotenv/config';

import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";


// setup
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middlewares
app.use(cors());
app.use(express.json());

// api endpoints
app.get("/", (req, res) => {
  res.send("Api working");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

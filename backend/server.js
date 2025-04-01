import express from "express";
import morgan from "morgan";
import cors from "cors";
import 'dotenv/config';
import cron from 'node-cron';
import https from 'https';

import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";

import adminRoutes from "./routes/admin.routes.js";
import doctorRoutes from "./routes/doctor.routes.js";
import userRoutes from "./routes/user.routes.js";


// setup
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();
app.use(morgan("dev"));

// middlewares
app.use(cors());
app.use(express.json());

// api endpoints
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/doctor", doctorRoutes);
app.use("/api/v1/user", userRoutes);



app.get("/", (req, res) => {
  res.send("Api working");
});

cron.schedule('*/5 * * * *', () => {
  console.log('Running a task every 5 minutes to keep the server active');
  
  // Use your actual deployed URL here
  const pingURL = process.env.SERVER_URL;
  
  https.get(pingURL, (res) => {
    console.log(`Ping successful, status code: ${res.statusCode}`);
  }).on('error', (err) => {
    console.error('Ping failed:', err.message);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

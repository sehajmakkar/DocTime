import express from "express";
import morgan from "morgan";
import cors from "cors";
import 'dotenv/config';
import cron from 'node-cron';
import https from 'https';
import axios from 'axios';

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

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);

  // Set up the cron job to run every 14 minutes
  cron.schedule('*/1 * * * *', async () => {
    try {
      // Get the server URL from environment variable or construct it
      const serverUrl = process.env.SERVER_URL || `http://localhost:${process.env.PORT}`;
      
      console.log(`[${new Date().toISOString()}] Executing cron job to keep server alive`);
      
      // Make a request to your own server
      const response = await axios.get(`${serverUrl}/ping`);
      console.log(`[${new Date().toISOString()}] Server pinged successfully:`, response.data.status);
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Error pinging server:`, error.message);
    }
  });
});
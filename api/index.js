import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoot from "./routes/auth.js";
import hotelsRoot from "./routes/hotels.js";
import roomsRoot from "./routes/rooms.js";
import usersRoot from "./routes/users.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from mongoDB");
});

mongoose.connection.on("connected", () => {
  console.log("Connected to mongoDB");
});


app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoot);
app.use("/api/users", usersRoot);
app.use("/api/hotels", hotelsRoot);
app.use("/api/rooms", roomsRoot);

app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || "Something went wrong";
  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  connect();
  console.log("Connected to backend.");
});

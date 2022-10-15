import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoot from "./routes/auth.js";
import hotelsRoot from "./routes/hotels.js";
import roomsRoot from "./routes/rooms.js";
import usersRoot from "./routes/users.js";

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
    console.log("Disconnected from mongoDB")
});

mongoose.connection.on("connected", () => {
    console.log("Connected to mongoDB")
});

app.use("/api/auth", authRoot);
app.use("/api/auth", usersRoot);
app.use("/api/auth", hotelsRoot);
app.use("/api/auth", roomsRoot);

app.listen(8800, () => {
  connect();
  console.log("Connected to backend.");
});

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.js";

// Configure env var so we can import hidden data.
dotenv.config();

const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());

// Using cors
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Cookieparser
app.use(cookieParser());

// Routers
app.use("/", authRoutes);

// Database connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Mongoose is connected to database"))
  .catch((err) => console.log(err.message));

// Listining to port
app.listen(port, () => {
  console.log(`Server has started at ${port}.`);
});

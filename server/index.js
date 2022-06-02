import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();

dotenv.config();

app.use(express.json());

const port = process.env.PORT || 8000;

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Mongoose is connected to database"))
  .catch((err) => console.log(err.message));

app.listen(port, () => {
  console.log(`Server has started at ${port}.`);
});

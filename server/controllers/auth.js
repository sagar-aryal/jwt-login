import Users from "../models/Users.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWT_SECRET;

const createToken = (id) => {
  return jwt.sign({ id }, secret, { expiresIn: "1h" });
};

const handleErrors = (err) => {
  let error;
  if (err.code === 11000) {
    error = "This email is already registered.";
    return error;
  }

  if (err.message === "incorrect Email") {
    error = "This email is not registered.";
    return error;
  }

  if (err.message === "incorrect password") {
    error = "This password is incorrect.";
    return error;
  }

  if (err.message.includes("Users validation failed")) {
    error = Object.values(err.errors).map((val) => val.message);
    return error;
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await Users.login(email, password);
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });
    res.status(200).json({ user: user._id, created: true });
  } catch (err) {
    // console.log(err.message);
    const errors = handleErrors(err);
    res.status(400).json({ errors, created: false });
  }
};

export const signup = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const user = await Users.create({ firstname, lastname, email, password });
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });
    res.status(201).json({ user: user._id, created: true });
  } catch (err) {
    // console.log(err.message);
    const errors = handleErrors(err);
    res.status(400).json({ errors, created: false });
  }
};

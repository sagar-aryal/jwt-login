import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import Users from "../models/Users.js";

dotenv.config();
const secret = process.env.JWT_SECRET;

export const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, secret, async (err, decodedToken) => {
      if (err) {
        res.json({ status: false });
        next();
      } else {
        const user = await Users.findById(decodedToken.id);
        if (user) res.json({ status: true, user: user.email });
        else res.json({ status: false });
        next();
      }
    });
  } else {
    res.json({ status: false });
    next();
  }
};

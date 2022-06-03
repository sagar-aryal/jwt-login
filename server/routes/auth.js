import express from "express";

import { signin, signup } from "../controllers/auth.js";
import { checkUser } from "../middlewares/authentication.js";

const router = express.Router();

router.post("/", signin);
router.post("/signup", signup);
router.post("/secret", checkUser);

export default router;

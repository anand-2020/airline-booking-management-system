import { Router } from "express";
import { login, logout, signup } from "../controllers/authController.js";
const router = Router();

//LOGIN
router.post("/login", login);

//SIGNUP
router.post("/signup", signup);

//LOG OUT
router.post("/logout", logout);

export default router;

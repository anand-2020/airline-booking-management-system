import { Router } from "express";
import { login, logout } from "../controllers/authController.js";
const router = Router();

//LOGIN
router.post("/login", login);

//LOG OUT
router.post("/logout", logout);

export default router;

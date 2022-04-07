import { Router } from "express";
import {
  protect,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  logout,
} from "../controllers/authController.js";
const router = Router();

//LOGIN
router.post("/login", login);

//  FORGOT PASSWORD
router.post("/forgotPassword", forgotPassword);

// RESET PASSWORD
router.patch("/resetPassword", resetPassword);

//UPDATE PASSWORD
router.patch("/updatePassword", protect, updatePassword);

//LOG OUT
router.post("/logout", logout);

export default router;

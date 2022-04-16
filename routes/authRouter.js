import { Router } from "express";
import {
  login,
  logout,
  signup,
  loggedInStatus,
  protect,
} from "../controllers/authController.js";
const router = Router();

//LOGIN
router.post("/login", login);

//SIGNUP
router.post("/signup", signup);

//LOG OUT
router.post("/logout", logout);

//GET LOGGED IN STATUS
router.get("/isLoggedIn", protect, loggedInStatus);

export default router;

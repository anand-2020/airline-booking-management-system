import { Router } from "express";
import {
  getAllAirports,
  addAirport,
} from "../controllers/airportController.js";

import { protect, restrictTo } from "../controllers/authController.js";

const router = Router();

router
  .route("/")
  .get(getAllAirports)
  .post(protect, restrictTo("W"), addAirport);

export default router;

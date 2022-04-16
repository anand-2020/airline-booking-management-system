import { Router } from "express";
import {
  getAllAirports,
  addAirport,
} from "../controllers/airportController.js";

const router = Router();

router.route("/").get(getAllAirports).post(addAirport);

export default router;

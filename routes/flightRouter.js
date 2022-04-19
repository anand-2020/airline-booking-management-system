import { Router } from "express";
import {
  getAllFlights,
  addFlight,
  updateFlight,
  bookedTicketsForFlight,
  getFlightsBetweenAirports,
} from "../controllers/flightController.js";

import {
  protect,
  restrictTo,
  isCustomer,
} from "../controllers/authController.js";

const router = Router();

router.route("/").get(getAllFlights).post(protect, restrictTo("W"), addFlight);

router.route("/:flightId").patch(protect, restrictTo("W"), updateFlight);

router
  .route("/:srcId/:destId/:dateOfDeparture")
  .get(isCustomer, getFlightsBetweenAirports);

router.get("/tickets/:flightDateId", protect, bookedTicketsForFlight);

export default router;

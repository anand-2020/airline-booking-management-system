import { Router } from "express";
import {
  getAllFlights,
  addFlight,
  updateFlight,
  bookedTicketsForFlight,
  getFlightsBetweenAirports,
} from "../controllers/flightController.js";

const router = Router();

router.route("/").get(getAllFlights).post(addFlight);
router.route("/:flightId").patch(updateFlight);

router.route("/:srcId/:destId/:dateOfDeparture").get(getFlightsBetweenAirports);

router.get("/tickets/:flightDateId", bookedTicketsForFlight);

export default router;

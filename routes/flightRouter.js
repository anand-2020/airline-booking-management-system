import { Router } from "express";
import {
  getAllFlights,
  addFlight,
  updateFlight,
  bookedTicketsForFlight,
} from "../controllers/flightController.js";

const router = Router();

router.route("/").get(getAllFlights).post(addFlight);
router.route("/:flightId").patch(updateFlight);

router.get("/tickets/:flightDateId", bookedTicketsForFlight);

export default router;

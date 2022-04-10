import { Router } from "express";
import {
  getAllFlights,
  addFlight,
  updateFlight,
} from "../controllers/flightController.js";

const router = Router();

router.route("/").get(getAllFlights).post(addFlight);
router.route("/:flightId").patch(updateFlight);

export default router;

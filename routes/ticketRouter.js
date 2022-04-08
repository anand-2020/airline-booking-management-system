import { Router } from "express";
import {
  bookTicket,
  getTicket,
  cancelTicket,
  bookedTicketsForFlight,
} from "../controllers/ticketController.js";

const router = Router();

router.post("/", bookTicket);

router.route("/:ticketId").get(getTicket).patch(cancelTicket);

router.get("/:flightId/:dateOfDeparture", bookedTicketsForFlight);

export default router;

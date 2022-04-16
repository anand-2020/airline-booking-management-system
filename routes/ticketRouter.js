import { Router } from "express";
import {
  bookTicket,
  getTicket,
  cancelTicket,
} from "../controllers/ticketController.js";

const router = Router();

router.post("/", bookTicket);

router.route("/:ticketId").get(getTicket).patch(cancelTicket);

export default router;

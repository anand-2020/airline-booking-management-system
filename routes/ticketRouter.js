import { Router } from "express";
import {
  bookTicket,
  getTicket,
  cancelTicket,
} from "../controllers/ticketController.js";

import { protect } from "../controllers/authController.js";
import { protectCustomer } from "../controllers/customerController.js";

const router = Router();

router.post("/", protect, bookTicket);

router
  .route("/:ticketId")
  .get(protect, protectCustomer("R", "W"), getTicket)
  .patch(protect, protectCustomer("N"), cancelTicket);

export default router;

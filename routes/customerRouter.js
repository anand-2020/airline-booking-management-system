import { Router } from "express";

import {
  getCustomer,
  getAllCustomer,
  getCustomerUpcomingTickets,
  getCustomerArchiveTickets,
  updateCustomer,
} from "../controllers/customerController.js";
const router = Router();

router.get("/", getAllCustomer);

router.get("/:id", getCustomer).patch("/:id", updateCustomer);

router.get("/:id/upcomingTickets", getCustomerUpcomingTickets);
router.get("/:id/archiveTickets", getCustomerArchiveTickets);

export default router;

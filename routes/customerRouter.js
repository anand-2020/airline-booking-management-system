import { Router } from "express";

import {
  getCustomer,
  getAllCustomer,
  getCustomerUpcomingTickets,
  getCustomerArchiveTickets,
  updateCustomer,
  protectCustomer,
} from "../controllers/customerController.js";

import { protect, restrictTo } from "../controllers/authController.js";

const router = Router();

router.get("/", protect, restrictTo("R", "W"), getAllCustomer);

router
  .get("/:id", protect, protectCustomer("R", "W"), getCustomer)
  .patch("/:id", protect, protectCustomer(), updateCustomer);

router.get(
  "/:id/upcomingTickets",
  protect,
  protectCustomer("R", "W"),
  getCustomerUpcomingTickets
);

router.get(
  "/:id/archiveTickets",
  protect,
  protectCustomer("R", "W"),
  getCustomerArchiveTickets
);

export default router;

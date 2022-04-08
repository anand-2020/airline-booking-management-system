import { Router } from "express";
import {
  getCustomer,
  getAllCustomer,
  getCustomerTickets,
} from "../controllers/customerController.js";
const router = Router();

router.get("/", getAllCustomer);

router.get("/:id", getCustomer);

router.get("/:id/tickets", getCustomerTickets);

export default router;

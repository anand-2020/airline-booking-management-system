import db from "../models/database.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

const getAllCustomer = catchAsync(async (req, res, next) => {
  const query = "SELECT * FROM CUSTOMERS";
  const customers = await db.executeQuery(query);

  customers.data.forEach((cust) => {
    cust.PASSWORD = null;
  });
  res.status(200).json({
    status: "success",
    customers,
  });
});

const getCustomer = catchAsync(async (req, res, next) => {
  const query = "SELECT * FROM CUSTOMERS WHERE CUSTOMER_ID = ?";
  const customer = await db.executeQuery(query, req.params.id);

  if (customer.data.length === 0) {
    return next(
      new AppError(`No customer found with ID ${req.params.id}`, 404)
    );
  }

  customer.data.forEach((cust) => {
    cust.PASSWORD = null;
  });

  res.status(200).json({
    status: "success",
    customer,
  });
});

// TODO : testing
const getCustomerTickets = catchAsync(async (req, res, next) => {
  const query =
    "SELECT * FROM TICKET WHERE CUSTOMER_ID = ? ORDER BY DATE_OF_BOOKING DESC";

  const tickets = await db.executeQuery(query, req.params.id);

  res.status(200).json({
    status: "success",
    tickets,
  });
});

export { getAllCustomer, getCustomer, getCustomerTickets };

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
    data: customers.data,
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
    data: customer.data,
  });
});

const updateCustomer = catchAsync(async (req, res, next) => {
  let query = `UPDATE CUSTOMERS SET `;

  if (req.body.CUSTOMER_NAME) {
    query += ` CUSTOMER_NAME = '${req.body.CUSTOMER_NAME}',`;
  }
  if (req.body.EMAIL_ID) {
    query += ` EMAIL_ID = '${req.body.EMAIL_ID}',`;
  }
  if (req.body.GENDER) {
    query += ` GENDER = '${req.body.GENDER}',`;
  }
  if (req.body.DOB) {
    query += ` DOB = '${req.body.DOB}',`;
  }
  if (req.body.PROFESSION) {
    query += ` PROFESSION = '${req.body.PROFESSION}',`;
  }
  if (req.body.COUNTRY_CODE) {
    query += ` COUNTRY_CODE = '${req.body.COUNTRY_CODE}',`;
  }
  if (req.body.PHONE_NO) {
    query += ` PHONE_NO = '${req.body.PHONE_NO}',`;
  }
  if (req.body.ADDRESS) {
    query += ` ADDRESS = '${req.body.ADDRESS}',`;
  }

  query = query.substring(0, query.length - 1);

  query += " WHERE CUSTOMER_ID = ?";

  await db.executeQuery(query, req.params.id);

  res.status(200).json({
    status: "success",
  });
});

const getCustomerUpcomingTickets = catchAsync(async (req, res, next) => {
  const resp = await db.executeQuery(
    `CALL SHOW_TICKETS_BY_CUSTOMER_ID('${req.params.id}', 1)`
  );

  res.status(200).json({
    status: "success",
    data: resp.data[0],
  });
});

const getCustomerArchiveTickets = catchAsync(async (req, res, next) => {
  const resp = await db.executeQuery(
    `CALL SHOW_TICKETS_BY_CUSTOMER_ID('${req.params.id}', 0)`
  );

  res.status(200).json({
    status: "success",
    data: resp.data[0],
  });
});

export {
  getAllCustomer,
  getCustomer,
  updateCustomer,
  getCustomerUpcomingTickets,
  getCustomerArchiveTickets,
};

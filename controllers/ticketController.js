import db from "../models/database.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

const bookTicket = catchAsync(async (req, res, next) => {
  let query = `INSERT INTO TICKET 
  (FLIGHT_DATE_ID, CUSTOMER_ID, PASSENGER_NAME, PASSENGER_AGE, TIME_OF_BOOKING, FARE, ROW_NUM, COL_NUM, STATUS) 
  VALUES `;

  const dt = new Date().toISOString().slice(0, 19).replace("T", " ");
  req.body.TICKETS.forEach((ticket) => {
    query += ` ( 
      '${req.body.FLIGHT_DATE_ID}', 
      '${req.user.CUSTOMER_ID}', 
      '${ticket.PASSENGER_NAME}', 
      '${ticket.PASSENGER_AGE}', 
      '${dt}', 
      ${ticket.FARE}, 
      ${ticket.ROW_NUM}, 
      ${ticket.COL_NUM}, 
      'BOOKED' ),`;
  });

  const bookedTicket = await db.executeQuery(
    query.substring(0, query.length - 1)
  );

  res.status(200).json({
    status: "success",
    data: {
      ticketId_start: bookedTicket.data.insertId,
    },
  });
});

const getTicket = catchAsync(async (req, res, next) => {
  const resp = await db.executeQuery(
    `CALL SHOW_TICKETS_BY_TICKET_ID(${req.params.ticketId})`
  );

  res.status(200).json({
    status: "success",
    data: resp.data[0],
  });
});

const cancelTicket = catchAsync(async (req, res, next) => {
  const dt = new Date().toISOString().slice(0, 19).replace("T", " ");
  const query = `CALL CANCEL_TICKET(${req.params.ticketId}, '${dt}')`;
  console.log(query);
  const resp = await db.executeQuery(query);

  console.log(resp);
  res.status(200).json({
    status: "success",
  });
});

export { bookTicket, getTicket, cancelTicket };

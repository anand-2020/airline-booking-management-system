import db from "../models/database.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

const bookTicket = catchAsync(async (req, res, next) => {
  const query =
    "INSERT INTO TICKET ( " +
    "FLIGHT_ID, " +
    "CUSTOMER_ID, " +
    "PASSENGER_NAME, " +
    "DATE_OF_BOOKING, " +
    "DATE_OF_DEPARTURE, " +
    "FARE, " +
    "SEAT_NUMBER, " +
    "STATUS )" +
    "VALUES(?, ?, ?, ?, ?, ?, ?, ?)";

  const params = [
    req.body.flight_id,
    req.body.customer_id, // change this to req.customer.customer_id when protect function in authController is written
    req.body.passenger_name,
    new Date(),
    req.body.date_of_departure,
    req.body.fare,
    req.body.seat_number,
    "BOOKED",
  ];

  const bookedTicket = await db.executeQuery(query, params);

  res.status(200).json({
    status: "success",
    data: {
      ticket_id: bookedTicket.data.insertId,
    },
  });
});

const getTicket = catchAsync(async (req, res, next) => {
  const query = "SELECT * FROM TICKET WHERE TICKET_ID = ?";

  const ticket = await db.executeQuery(query, req.params.ticketId);

  if (ticket.data.length === 0) {
    return next(
      new AppError(`No ticket found with ID ${req.params.ticketId}`, 404)
    );
  }

  res.status(200).json({
    status: "success",
    ticket,
  });
});

const cancelTicket = catchAsync(async (req, res, next) => {
  const query = "UPDATE TICKET SET status = 'CANCELLED' WHERE TICKET_ID = ?";

  const cancelledTicket = await db.executeQuery(query, req.params.ticketId);

  if (cancelledTicket.data.affectedRows === 0) {
    return next(
      new AppError(`No ticket found with ID ${req.params.ticketId}`, 404)
    );
  }

  res.status(200).json({
    status: "success",
  });
});

// for admins and superadmins
const bookedTicketsForFlight = catchAsync(async (req, res, next) => {
  const params = [req.params.flightId, req.params.dateOfDeparture];

  const flightQuery =
    "SELECT * FROM FLIGHT_DATE WHERE FLIGHT_ID = ? AND DEPARTURE_DATE = ?";

  const flight = await db.executeQuery(flightQuery, params);

  if (flight.data.length === 0) {
    return next(
      new AppError(
        `No flight found with ID ${req.params.flightId} on date ${req.params.dateOfDeparture}`,
        404
      )
    );
  }

  const query =
    "SELECT * FROM TICKET WHERE FLIGHT_ID = ? AND DATE_OF_DEPARTURE = ?";

  const bookedTickets = await db.executeQuery(query, params);

  res.status(200).json({
    status: "success",
    bookedTickets,
  });
});

export { bookTicket, getTicket, cancelTicket, bookedTicketsForFlight };

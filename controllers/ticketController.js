import db from "../models/database.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

const bookTicket = catchAsync(async (req, res, next) => {
  const query = `INSERT INTO TICKET 
  (FLIGHT_ID, CUSTOMER_ID, PASSENGER_NAME, TIME_OF_BOOKING, DATE_OF_DEPARTURE, FARE, SEAT_NUMBER, STATUS) 
  VALUES(?, ?, ?, ?, ?, ?, ?, ?)`;

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
  const query = `SELECT TICKET.*, FLIGHT_PATH.DEPARTURE_TIME, FLIGHT_PATH.DURATION, 
  SRC.AIRPORT_ID AS SRC_AIRPORT_ID, 
  SRC.AIRPORT_NAME AS SRC_AIRPORT_NAME, 
  SRC.CITY AS SRC_CITY, 
  SRC.COUNTRY AS SRC_COUNTRY, 
  DEST.AIRPORT_ID AS DEST_AIRPORT_ID, 
  DEST.AIRPORT_NAME AS DEST_AIRPORT_NAME, 
  DEST.CITY AS DEST_CITY, 
  DEST.COUNTRY AS DEST_COUNTRY  
  FROM TICKET, FLIGHT_PATH, AIRPORT SRC, AIRPORT DEST 
  WHERE TICKET_ID = ? 
  AND TICKET.FLIGHT_ID = FLIGHT_PATH.FLIGHT_ID 
  AND FLIGHT_PATH.SOURCE_ID = SRC.AIRPORT_ID 
  AND FLIGHT_PATH.DESTINATION_ID = DEST.AIRPORT_ID`;

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
  const query = `UPDATE TICKET SET status = 'CANCELLED' WHERE TICKET_ID = ?`;

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

  const flightQuery = `SELECT FLIGHT_PATH.*, FLIGHT_DATE.DEPARTURE_DATE,  
  SRC.AIRPORT_ID AS SRC_AIRPORT_ID, 
  SRC.AIRPORT_NAME AS SRC_AIRPORT_NAME, 
  SRC.CITY AS SRC_CITY, 
  SRC.COUNTRY AS SRC_COUNTRY, 
  DEST.AIRPORT_ID AS DEST_AIRPORT_ID, 
  DEST.AIRPORT_NAME AS DEST_AIRPORT_NAME, 
  DEST.CITY AS DEST_CITY, 
  DEST.COUNTRY AS DEST_COUNTRY 
  FROM FLIGHT_DATE, FLIGHT_PATH, AIRPORT SRC, AIRPORT DEST 
  WHERE FLIGHT_DATE.FLIGHT_ID = ? AND 
  STR_TO_DATE(FLIGHT_DATE.DEPARTURE_DATE, '%Y-%m-%d') = STR_TO_DATE(? , '%Y-%m-%d')  
  AND FLIGHT_DATE.FLIGHT_ID = FLIGHT_PATH.FLIGHT_ID 
  AND FLIGHT_PATH.SOURCE_ID = SRC.AIRPORT_ID 
  AND FLIGHT_PATH.DESTINATION_ID = DEST.AIRPORT_ID`;

  const flight = await db.executeQuery(flightQuery, params);

  if (flight.data.length === 0) {
    return next(
      new AppError(
        `No flight found with ID ${req.params.flightId} on date ${req.params.dateOfDeparture}`,
        404
      )
    );
  }

  const query = `SELECT TICKET_ID, PASSENGER_NAME, TIME_OF_BOOKING, FARE, SEAT_NUMBER, STATUS 
  FROM TICKET WHERE FLIGHT_ID = ? AND DATE_OF_DEPARTURE = ?`;

  const bookedTickets = await db.executeQuery(query, params);

  res.status(200).json({
    status: "success",
    flight,
    bookedTickets,
  });
});

export { bookTicket, getTicket, cancelTicket, bookedTicketsForFlight };

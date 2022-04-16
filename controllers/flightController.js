import db from "../models/database.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const getAllFlights = catchAsync(async (req, res, next) => {
  const resp = await db.executeQuery(`CALL SHOW_FLIGHT_PATH_FOR_ADMIN`);

  res.status(200).json({
    status: "success",
    data: resp.data[0],
  });
});

export const getFlightsBetweenAirports = catchAsync(async (req, res, next) => {
  const cid = "af";
  if (req.user) {
    cid = req.user.CUSTOMER_ID;
  }
  const query = `CALL SHOW_FLIGHTS(
    '${cid}', 
    '${req.params.srcId}', 
    '${req.params.destId}', 
    '${req.params.dateOfDeparture}'
  ) `;

  const resp = await db.executeQuery(query);

  res.status(200).json({
    status: "success",
    data: resp.data[0],
  });
});

export const addFlight = catchAsync(async (req, res, next) => {
  const query = `CALL ADD_FLIGHT_PATH_FOR_ADMIN ( 
    '${req.body.FLIGHT_ID}', 
    '${req.body.SRC_ID}', 
    '${req.body.DEST_ID}', 
    '${req.body.DEPARTURE_TIME}', 
    '${req.body.DURATION}',  
    ${req.body.NUM_ROWS}, 
    ${req.body.NUM_COLS}, 
    ${req.body.BASE_FARE},
    '${req.body.LEASE_EXPIRY}', 
    '${req.body.DAYS_STRING}' ) 
    `;

  const resp = await db.executeQuery(query);

  res.status(200).json({
    status: "success",
  });
});

// export const getAllFlights = catchAsync(async (req, res, next) => {

//   const query = `SELECT * FROM FLIGHT_PATH ORDER BY FLIGHT_ID DESC `;
//   const flights = await db.executeQuery(query);
//   flights.data.forEach((flight) => (flight = { ...flight, DAYS_OF_WEEK: [] }));

//   const daysOfWeek = await db.executeQuery(
//     `SELECT * FROM FLIGHT_DAY ORDER BY FLIGHT_ID DESC`
//   );
//   const dayFlightMap = new Map();
//   flights.data.forEach((flight) => dayFlightMap.set(flight.FLIGHT_ID, []));

//   daysOfWeek.data.forEach((el) =>
//     dayFlightMap.set(el.FLIGHT_ID, [
//       ...dayFlightMap.get(el.FLIGHT_ID),
//       el.DAY_OF_WEEK,
//     ])
//   );

//   flights.data.forEach(
//     (flight) => (flight.DAYS_OF_WEEK = [...dayFlightMap.get(flight.FLIGHT_ID)])
//   );

//   res.status(200).json({
//     status: "success",
//     flights,
//   });
// });

// export const addFlight = catchAsync(async (req, res, next) => {
//   const {
//     FLIGHT_ID,
//     SOURCE_ID,
//     DESTINATION_ID,
//     DEPARTURE_TIME,
//     DURATION,
//     NUM_ROWS,
//     NUM_COLS,
//     BASE_FARE,
//     CONTINUED_TILL,
//     DAYS_OF_WEEK,
//   } = req.body;

//   const query = `INSERT INTO FLIGHT_PATH VALUES ('${FLIGHT_ID}',${SOURCE_ID},${DESTINATION_ID},'${DEPARTURE_TIME}','${DURATION}',${NUM_ROWS},${NUM_COLS},${BASE_FARE},'${CONTINUED_TILL}')`;

//   await db.executeQuery(query);

//   DAYS_OF_WEEK.forEach(
//     async (el) =>
//       await db.executeQuery(
//         `INSERT INTO FLIGHT_DAY VALUES ('${FLIGHT_ID}','${el.toString()}')`
//       )
//   );

//   res.status(200).json({
//     status: "success",
//   });
// });

export const updateFlight = catchAsync(async (req, res, next) => {
  const { flightId } = req.params;
  let func = null;
  let resp;
  if (req.body.CONTINUED_TILL) {
    func = `CHANGE_LEASE_DATE_FLIGHT_PATH('${flightId}','${req.body.CONTINUED_TILL}')`;
    resp = await db.executeQuery(
      `SELECT CHANGE_LEASE_DATE_FLIGHT_PATH('${flightId}','${req.body.CONTINUED_TILL}')`
    );

    res.status(200).json({
      status: func != null && resp.data[0][func] ? "success" : "fail",
    });
  } else if (req.body.DEPARTURE_DATE && req.body.DELAY_TIME) {
    func = `DELAY_FLIGHT_DATE('${flightId}','${req.body.DEPARTURE_DATE}','${req.body.DELAY_TIME}')`;
    resp = await db.executeQuery(
      `CALL DELAY_FLIGHT_DATE('${flightId}','${req.body.DEPARTURE_DATE}','${req.body.DELAY_TIME}')`
    );

    res.status(200).json({
      status: "success",
      data: resp.data[0],
    });
  } else if (req.body.CANCEL === true) {
    func = `CANCEL_FLIGHT_DATE('${flightId}','${req.body.DEPARTURE_DATE}')`;
    resp = await db.executeQuery(
      `CALL CANCEL_FLIGHT_DATE('${flightId}','${req.body.DEPARTURE_DATE}')`
    );

    res.status(200).json({
      status: "success",
      data: resp.data[0],
    });
  }

  //   console.log(resp.data[0][func]);
});

// for seat map
export const bookedTicketsForFlight = catchAsync(async (req, res, next) => {
  const query = `SELECT ROW_NUM, COL_NUM FROM TICKET 
  WHERE FLIGHT_DATE_ID = ? AND STATUS = 'BOOKED'`;

  const bookedSeats = await db.executeQuery(query, req.params.flightDateId);
  console.log(bookedSeats);

  res.status(200).json({
    status: "success",
    data: bookedSeats.data,
  });
});

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
  let cid = "lm2"; // DEFAULT USER ID
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

  console.log(resp.data[0]);
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
  } else if (req.body.BASE_FARE) {
    const query = `UPDATE FLIGHT_PATH SET BASE_FARE = ${req.body.BASE_FARE} WHERE FLIGHT_ID = '${flightId}'`;

    await db.executeQuery(query);
    res.status(200).json({
      status: "success",
    });
  } else if (req.body.WEEK_DAYS) {
    resp = await db.executeQuery(
      `CALL CHANGE_DAY_OF_WEEK_FLIGHT_DAY('${flightId}','${req.body.WEEK_DAYS}')`
    );
    console.log(res);

    res.status(200).json({
      status: "success",
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

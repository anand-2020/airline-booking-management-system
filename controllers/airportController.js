import db from "../models/database.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const getAllAirports = catchAsync(async (req, res, next) => {
  const query = `SELECT * FROM AIRPORT ORDER BY COUNTRY`;
  const airports = await db.executeQuery(query);

  res.status(200).json({
    status: "success",
    data: airports.data,
  });
});

export const addAirport = catchAsync(async (req, res, next) => {
  const query = `INSERT INTO AIRPORT VALUES (?, ?, ?, ?, ?)`;
  const params = [
    req.body.AIRPORT_ID,
    req.body.AIRPORT_NAME,
    req.body.CITY,
    req.body.COUNTRY,
    req.body.OFFSET,
  ];

  await db.executeQuery(query, params);

  res.status(200).json({
    status: "success",
  });
});

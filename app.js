import express from "express";
import { resolve } from "path";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import AppError from "./utils/appError.js";
import errorHandler from "./utils/errorHandler.js";
import { NODE_ENV } from "./utils/config.js";
import authRouter from "./routes/authRouter.js";
import customerRouter from "./routes/customerRouter.js";
import ticketRouter from "./routes/ticketRouter.js";
import flightRouter from "./routes/flightRouter.js";

//ROUTERS

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// app.options("*", cors());
app.use(helmet());

app.use(express.json());
app.use(cookieParser());

//CORS Request

//REQUEST LOGGER
if (NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

//ROUTES
app.use("/api/auth", authRouter);
app.use("/api/customer", customerRouter);
app.use("/api/ticket", ticketRouter);
app.use("/api/flight", flightRouter);

//client/build
if (NODE_ENV === "production") {
  app.use(express.static(__dirname + "/client/build"));

  app.get("*", (req, res) => {
    res.sendFile(resolve(__dirname, "client", "build", "index.html"));
  });
}

//NO URL
app.all("*", (req, res, next) => {
  next(new AppError(`No url found found for ${req.url}`, 404));
});

app.use(errorHandler);

export default app;

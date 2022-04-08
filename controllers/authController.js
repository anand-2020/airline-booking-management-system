import jwt from "jsonwebtoken";
import { promisify } from "util";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import path from "path";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import db from "../models/database.js";
import {
  JWT_COOKIE_EXPIRES_IN,
  NODE_ENV,
  JWT_SECRET,
  JWT_EXPIRES_IN,
} from "../utils/config.js";

const signToken = (id) => {
  return jwt.sign({ id: id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

const createSendToken = (user, statusCode, res) => {
  // console.log(user);
  const token = signToken(user.id);
  // console.log(token);
  const cookieOptions = {
    expires: new Date(Date.now() + JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    // httpOnly: true,
  };
  if (NODE_ENV == "production") {
    cookieOptions.secure = true;
  }
  res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

const verifyJWT = async (token, next) => {
  return await promisify(jwt.verify)(token, JWT_SECRET);
};

export const protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(new AppError("You are not logged in", 401));
  }
  const decoded = await verifyJWT(token, next);
  if (!decoded) throw new AppError("Your Password or email is Wrong");

  const user = await db.executeQuery(
    `SELECT * FROM CUSTOMERS WHERE CUSTOMER_ID=${decoded.id}`
  );
  if (!user.data.length) {
    return new AppError(
      "The user belonging to this token does no longer exist.",
      401
    );
  }

  req.user = user;

  next();
});

export const restrictTo = (...roles) => {
  return catchAsync(async (req, res, next) => {
    const id = req.user.id;
    const user = await db.query(
      `SELECT role FROM CUSTOMERS WHERE CUSTOMER_ID=${id}`
    );
    if (!user.data.length) {
      return new AppError(
        "The user belonging to this token does no longer exist.",
        401
      );
    }
    const role = user.data[0].role;
    if (!roles.includes(role))
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );

    next();
  });
};

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  // 2) Check if user exists && password is correct
  const user = await db.executeQuery(
    `SELECT * FROM CUSTOMERS WHERE email='${email}'`
  );
  console.log(user);
  //1) find the user
  if (!user.data.length)
    return new AppError("Your email or password is wrong.", 401);

  //2) check if the current password is correct
  if (!(await bcrypt.compare(password, user.data[0].PASSWORD))) {
    return new AppError("Your email or password is wrong.", 401);
  }

  // 3) If everything ok, send token to client
  createSendToken(user.data[0], 200, res);
});

export const signup = catchAsync(async (req, res, next) => {
  const newCustomer = {
    CUSTOMER_ID: req.body.CUSTOMER_ID,
    CNAME: req.body.CNAME,
    EMAIL: req.body.EMAIL,
    PASSWORD: req.body.PASSWORD,
    GENDER: req.body.GENDER,
    DOB: req.body.DOB,
    ROLE: req.body.ROLE,
    PROFESSION: req.body.PROFESSION,
    PHONE_NO: req.body.PHONE_NO,
    ADDRESS: req.body.ADDRESS,
  };

  const salt = await bcrypt.genSalt(10);
  newCustomer.PASSWORD = await bcrypt.hash(newCustomer.PASSWORD, salt);
  const resp = await db.executeQuery(
    `INSERT INTO CUSTOMERS VALUES ('${newCustomer.CUSTOMER_ID}', '${newCustomer.PASSWORD}', '${newCustomer.EMAIL}', '${newCustomer.CNAME}', '${newCustomer.GENDER}', STR_TO_DATE('${newCustomer.DOB}','%Y/%m/%d'), '${newCustomer.ROLE}', '${newCustomer.PROFESSION}', '${newCustomer.PHONE_NO}', '${newCustomer.ADDRESS}')`
  );

  console.log(resp);

  createSendToken(newCustomer, 201, res);
});

export const logout = catchAsync(async (req, res, next) => {
  const token = "loggedout";
  const cookieOptions = {
    expires: new Date(Date.now() + JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
  };
  if (NODE_ENV == "production") {
    cookieOptions.secure = true;
  }
  res.cookie("jwt", token, cookieOptions);

  res.status(200).json({
    status: "success",
    token,
  });
});

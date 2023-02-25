import { Request, Response, NextFunction } from "express";
import ErrorResponse from "./interface/ErrorResponse";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response<ErrorResponse>
) {
  console.log("heree");
  const statuscode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statuscode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? " " : err.stack,
  });
}

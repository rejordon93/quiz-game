import jwt from "jsonwebtoken";
//
import { SECRET_KEY } from "../config";
import { ExpressError } from "../ExpressError";
// types /
import type { NextFunction, Request, Response } from "express";

/** Middleware: Authenticate user.
 *
 * If a token was provided, verify it, and, if valid, store the token payload
 * on res.locals (this will include the username field.)
 *
 * It's not an error if no token was provided or if the token is not valid.
 */

export function authenticateJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers && req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace(/^[Bb]earer /, "").trim();
      res.locals.user = jwt.verify(token, SECRET_KEY);
    }
    return next();
  } catch (err) {
    return next();
  }
}

/** If user is logged id (found in "res.locals") let access restricted route
 *
 * else throw 'Unauthorized" error with 401 status
 */
export function ensureLoggedIn(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!res.locals.user) {
    const err = new ExpressError("Unauthorized", 401);
    return next(err);
  } else {
    return next();
  }
}

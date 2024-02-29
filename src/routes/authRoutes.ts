import { NextFunction, Router, Request, Response } from "express";
import { ExpressError } from "../ExpressError";
import { createToken } from "../helpers/token";
import { UserData } from "../types/UserType";
import { User } from "../models/User";
import { UserFromData } from "../types/UserType";

export const authRouter = Router();

/** Register user route
 *
 * Checks if all fields are filled and there is no
 * duplicate username, takes that data to
 * create a new user and returns a JWT token which is used
 * to keep user as "current" accross the app.
 *
 */

authRouter.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // implement our registration here //
      const errors: string[] = [];
      const formData: UserFromData = req.body;

      if (!formData.username) {
        errors.push("Username is required");
      }
      if (!formData.password) {
        errors.push("Password is required");
      }
      if (!formData.email) {
        errors.push("Email is required");
      }
      if (errors.length > 0) {
        return res.json({ message: "Error", token: null, errors });
      }

      const exists = await User.checkIfExists(formData.username!);

      if (exists) {
        return res.status(400).json({ message: "A user already exists" });
      }

      const createUser = await User.create(
        formData.username!,
        formData.password!,
        formData.email!
      );

      // Create JWT token
      const token = createToken(createUser);
      console.log(token);

      return res
        .status(201)
        .json({ message: "User registered successfully", token });
    } catch (error) {
      console.error("Registration error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

/** Login user route
 *
 * First checks if both username and password are provided,
 * then checks if the data provided is valid using authenticate method
 *
 * Returns a JWT token if passed authentication
 * to keep user as "current" accross the app.
 *
 */

authRouter.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: UserFromData = req.body;

      if (!userData.username || !userData.password) {
        return res
          .status(400)
          .json({ message: "Username and password are required" });
      }
      const user = await User.authenticate(
        userData.username,
        userData.password
      );
      if (user) {
        // Authentication successful
        const token = createToken(user);
        return res.json({ message: "login successful", token });
      } else {
        // Authentication failed due to missing username or password
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }
    } catch (e: unknown) {
      // Handle errors
      console.error("Login error:", e);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

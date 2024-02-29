import * as bcrypt from "bcrypt";
//
import { db } from "../db";
import { ExpressError, NotFoundError } from "../ExpressError";
import { UserData } from "../types/UserType";
import { kMaxLength } from "buffer";

export class User {
  constructor(
    public id: number,
    public username: string,
    public email: string,
    public password: string
  ) {
    // nothing is set by constructor at the moment //
  }

  //_______Get by username, returns new User instance
  static async getByUsename(username: string): Promise<UserData> {
    const results = await db.query(
      `SELECT * FROM users
	   WHERE username = $1`,
      [username]
    );

    const u = results.rows[0] as UserData;

    if (!u) throw new NotFoundError();
    return new User(u.id, u.username, u.email, u.password);
  }

  static async checkIfExists(username: string): Promise<boolean> {
    const results = await db.query(
      `SELECT * FROM users
	   WHERE username = $1`,
      [username]
    );

    const u = results.rows[0] as UserData;

    return u ? true : false;
  }

  //_______Get all users method (future features)
  static async getAll(): Promise<UserData[]> {
    const results = await db.query(`SELECT * FROM users`);
    const users = results.rows as UserData[];
    return users;
  }

  //_______Get user by id (future development)
  static async getById(id: number): Promise<UserData> {
    const results = await db.query(
      `SELECT * FROM users
	   WHERE id = $1`,
      [id]
    );
    const u = results.rows[0] as UserData;

    if (!u) throw new NotFoundError(); // what is this doing ? //

    return new User(u.id, u.username, u.email, u.password);
  }

  //_______Adds a new user to DB, returns that user instance
  static async create(
    username: string,
    password: string,
    email: string
  ): Promise<UserData> {
    // password gets hashed first
    // implement a bcrypt hashing query here //
    const results = await db.query(
      `INSERT INTO users (username, email, password) 
      VALUES ($1, $2, $3)
        RETURNING username, email`,
      [username, email, password]
    );

    const u = results.rows[0] as User;
    return new User(u.id, u.username, u.email, u.password);
  }

  //______Authenticates user info using bcript.compare()
  static async authenticate(
    username: string,
    password: string
  ): Promise<UserData | null> {
    const results = await db.query(
      `SELECT * FROM users
      WHERE username = $1`,
      [username]
    );

    const user = results.rows[0] as UserData;
    console.log(user);

    if (user.password === password) {
      // User authentication successful
      return user;
    } else {
      throw new ExpressError("Invalid credentials", 403);
    }
  }

  //_____Deletes user (future development)
  static async remove(id: number): Promise<void> {
    await db.query(`DELETE FROM users WHERE id = $1`, [id]);
  }
}

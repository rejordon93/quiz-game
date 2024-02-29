import { Client } from "pg";
import { DB_URI } from "./config";

export let db: Client;
console.log(5);
console.log(DB_URI);
db =
  process.env.NODE_ENV === "production" && process.env.DATABASE_URL
    ? new Client({
        connectionString: DB_URI,
        ssl: {
          rejectUnauthorized: false,
        },
      })
    : new Client({
        connectionString: DB_URI,
      });

db.connect();

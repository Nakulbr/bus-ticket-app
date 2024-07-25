import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { configDotenv } from "dotenv";
import * as schema from "./schema";

configDotenv();

const poolConnection = mysql.createPool({
  uri: process.env.DB_URL,
});

const db = drizzle(poolConnection, {
  mode: "default",
  logger: true,
  schema,
});

export default db;

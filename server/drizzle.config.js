import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  dialect: "mysql",
  out: "./migrations",
  dbCredentials: {
    url: process.env.DB_URL,
  },
  verbose: true,
  strict: true,
});

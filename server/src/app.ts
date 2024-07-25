import { Express, urlencoded } from "express";
import express from "express";
import cors from "cors";
import { authRoutes } from "./routes/auth.routes";

const app: Express = express();

// Middleware
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);

// Routes
app.use("/auth", authRoutes);

export default app;

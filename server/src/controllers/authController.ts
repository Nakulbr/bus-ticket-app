import { Request, Response } from "express";
import db from "../db/db";
import { userSchema } from "../db/schema";
import { compare, hash } from "bcrypt";
import { signUpSchema } from "../validators/auth/signUp.validator";
import { sign } from "jsonwebtoken";
import { eq, sql } from "drizzle-orm";

export const signUp = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const body: signUpSchema = req.body;
    const saltRounds = 10;
    const hashedPassword = await hash(body.password, saltRounds);
    body.password = hashedPassword;
    await db.insert(userSchema).values(body);
    res.status(200).json({
      message: "User Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await db.query.userSchema.findFirst({
      where: eq(userSchema.email, email),
    });
    if (!user) {
      return res.status(404).json({
        error: "Invalid email or password",
      });
    }
    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = sign(user, process.env.JWT_SECRET!);

    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

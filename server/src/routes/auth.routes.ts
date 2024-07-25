import { Router } from "express";
import { validateSchema } from "../utils/validateSchema";
import { signUpValidationSchema } from "../validators/auth/signUp.validator";
import { login, signUp } from "../controllers/authController";
import { loginValidationSchema } from "../validators/auth/login.validator";

const router: Router = Router();

router
  .route("/signup")
  .post(validateSchema(signUpValidationSchema, "body"), signUp);

router
  .route("/login")
  .post(validateSchema(loginValidationSchema, "body"), login);

export { router as authRoutes };

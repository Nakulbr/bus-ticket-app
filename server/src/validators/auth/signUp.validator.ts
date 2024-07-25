import { z } from "zod";

export const signUpValidationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character"
    ),
  phoneNumber: z
    .string()
    .length(10, "Phone number must be 10 digits")
    .regex(/^\d{10}$/, "Phone number must consist of digits only"),
});

export type signUpSchema = z.infer<typeof signUpValidationSchema>;

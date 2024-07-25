import { z } from "zod";

export const loginValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type loginSchema = z.infer<typeof loginValidationSchema>;

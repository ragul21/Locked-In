import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z.string().min(1, "Must contain atleast 1 characters"),
  email: z.string().email("Email must be valid"),
  password: z.string().min(6, "invalid password"),
});

export const signInSchema = z.object({
  email: z.string().email("email must be valid"),
  password: z.string().min(6, "password is invalid"),
});

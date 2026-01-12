import { z } from "zod";

export const userUpdateSchema = z.object({
  firstName: z.string().min(1, "invalid name"),
});

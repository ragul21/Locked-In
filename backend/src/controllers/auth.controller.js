import { createUser } from "../services/auth.service.js";
import { signUpSchema } from "../validators/authvalidator.js";
import { signInSchema } from "../validators/authvalidator.js";
import { signInUserService } from "../services/auth.service.js";

export const signup = async (req, res) => {
  const result = signUpSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: result.error.message,
    });
  }

  try {
    const user = await createUser(result.data);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const signin = async (req, res) => {
  const result = signInSchema.safeParse(req.body);

  if (result.success == false) {
    res.status(400).json({ message: result.error.message });
    return;
  }
  try {
    const user = await signInUserService(result.data);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

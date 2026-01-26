import { createUser } from "../services/auth.service.js";
import { signUpSchema } from "../validators/authvalidator.js";
import { signInSchema } from "../validators/authvalidator.js";
import { signInUserService } from "../services/auth.service.js";
import { signUpUserService } from "../services/auth.service.js";

// ============================================================================================
//                                 THIS CONTROLLER HANDLES THE SIGN UP REQUEST
// ============================================================================================

export const signup = async (req, res) => {
  /* VALIDATES AGAINST THE Z OBJECT THAT WAS CREATED FOR SIGN UP RETURNS RETURN OBJECT*/

  const result = signUpSchema.safeParse(req.body);

  /* SUCCESS TRUE IF IT PASSES THE VALIDATION */
  /* SUCCESS FALSE IF IT DOESN'T PASS THE VALIDATION */
  if (!result.success) {
    return res.status(400).json({
      message: result.error.message,
    });
  }

  /* ONLY AFTER PASSING THE BACKEND INPUT VALIDATIONS WE ARE SENDING THE DATA TO THE SERVICE LAYER */
  /* CATCH WILL HANDLE IF DATA ALREADY EXSIST IN THE DATABASE CASES */
  try {
    const { token } = await signUpUserService(result.data);
    // SET TOKEN AS HTTP-ONLY COOKIE
    res.cookie("token", token, {
      httpOnly: true, // Can't be accessed by JavaScript
      secure: process.env.NODE_ENV === "production", // Only HTTPS in production
      sameSite: "lax", // CSRF protection
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    });
    res.json({ message: "Sign up successful" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ============================================================================================
//                                 THIS CONTROLLER HANDLES THE SIGN IN REQUEST
// ============================================================================================

export const signin = async (req, res) => {
  const result = signInSchema.safeParse(req.body); // CHECKING AGAINST THE SCHEMA OBJECT

  if (result.success == false) {
    res.status(400).json({ message: result.error.message });
    return;
  }

  /* ONCE ALL THE VALIDATION IS DONE , THEN WE PROCEED WITH THE SIGNINUSERSERVICE */
  try {
    const { token } = await signInUserService(result.data);

    // SET TOKEN AS HTTP-ONLY COOKIE
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ message: "Sign up successful" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.json({ message: "Logged out successfully" });
};

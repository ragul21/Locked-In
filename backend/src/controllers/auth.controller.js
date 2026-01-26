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
    const user = await signUpUserService(result.data);
    res.json(user); //TOKEN IS ATTACHED IN THE HEADER OF THE RESPONSE AND SENDS THE RESPONSE TO THE FRONTEND FETCH API
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
    const user = await signInUserService(result.data); // CALLING THE SIGN IN SERVICE WITH THE RESULT DATA THAT IS THE INPUT WE GOT FROM THE USER
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

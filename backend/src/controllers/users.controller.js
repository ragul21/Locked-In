// ==============================================================================================================
//       HANDLES THE PROFILE PAGE SHOW AND EDIT (GET AND UPDATE) FUNCTIONALITIES
// ==============================================================================================================

import { getUserByIDService } from "../services/users.service.js";
import { updateUserByIdService } from "../services/users.service.js";
import { userUpdateSchema } from "../validators/user.validator.js";
import { deleteByIdService } from "../services/users.service.js";

/*---------------------- THIS BLOCK RUNS FOR SHOWING USER DATA IN THE PROFILE PAGE ------------------- */
export const getUserByID = async (req, res) => {
  const id = req.user.userId; // taking the user id which was attached

  try {
    const user = await getUserByIDService(id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
/* -------------------------------WHEN USER CLICKS SAVE IN EDIT UI -------------------------------------------------------- */

export const updateUserById = async (req, res) => {
  const id = req.user.userId; // TAKE THE ID FROM THE UI

  /* ONCE DO THE VALIDATION IF THE UPDATE REQUEST NAME IS VALID */
  const result = userUpdateSchema.safeParse(req.body);

  if (result.success == false) {
    res.status(400).json({ message: result.error.message });
    return;
  }

  try {
    const updatedUser = await updateUserByIdService(id, result.data);

    res.json(updatedUser);
  } catch (error) {
    res.status(404).json({ message: "user not found " });
  }
};

/* THIS IS A DELETE REQUEST WHICH WILL DELETE THE DATA FROM THE DB */

export const deleteUserById = async (req, res) => {
  const id = req.user.userId;

  try {
    await deleteByIdService(id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: "user not found " });
  }
};

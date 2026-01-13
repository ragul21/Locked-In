import { getUserByIDService } from "../services/users.service.js";
import { updateUserByIdService } from "../services/users.service.js";
import { userUpdateSchema } from "../validators/user.validator.js";
import { deleteByIdService } from "../services/users.service.js";
/////// get all rest api ////////////

export const getUserByID = async (req, res) => {
  const id = req.user.userId;

  try {
    const user = await getUserByIDService(id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/////// update rest api ///////////////

export const updateUserById = async (req, res) => {
  const id = req.user.userId;

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

export const deleteUserById = async (req, res) => {
  const id = req.user.userId;

  try {
    await deleteByIdService(id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: "user not found " });
  }
};

import { getUserByIDService } from "../services/users.service.js";

export const getUserByID = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await getUserByIDService(id); // 👈 await
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

import { Router } from "express";
import { getUserByID } from "../controllers/users.controller.js";
import { updateUserById } from "../controllers/users.controller.js";
import { deleteUserById } from "../controllers/users.controller.js";
const router = Router();

router.get("/:id", getUserByID);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);
export default router;

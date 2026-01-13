import { Router } from "express";
import { getUserByID } from "../controllers/users.controller.js";
import { updateUserById } from "../controllers/users.controller.js";
import { deleteUserById } from "../controllers/users.controller.js";
import { tokenChecker } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/me", tokenChecker, getUserByID);
router.put("/me", tokenChecker, updateUserById);
router.delete("/me", tokenChecker, deleteUserById);
export default router;

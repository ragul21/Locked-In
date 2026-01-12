import { Router } from "express";
import { getUserByID } from "../controllers/users.controller.js";

const router = Router();

router.get("/:id", getUserByID);

export default router;

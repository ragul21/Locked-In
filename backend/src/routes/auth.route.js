import { Router } from "express";
import { signup } from "../controllers/auth.controller.js";
import { signin } from "../controllers/auth.controller.js";
const router = Router();

router.post("/signup", signup); // if it matches the path it calls the constroller method
router.post("/signin", signin);
export default router;

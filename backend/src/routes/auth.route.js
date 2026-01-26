import { Router } from "express";
import { signup } from "../controllers/auth.controller.js";
import { signin, logout } from "../controllers/auth.controller.js";
const router = Router();

router.post("/signup", signup); // if it matches the path it calls the signup controller method
router.post("/signin", signin); //if it matches the path it will call the signin controller method
router.post("/auth/logout", logout);
export default router;

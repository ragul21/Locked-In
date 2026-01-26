import express from "express";
import authRoutes from "./routes/auth.route.js";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import reviewRoutes from "./routes/review.routes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser()); //cookieParser() makes req.cookies available in all routes
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true, //in CORS allows browser to send/receive cookies cross-origin
  }),
); //FIRST MIDDLEWARE FUNCTION THAT ALLOWS CROSS ORIGIN COMMUNITION OTHERWISE BROWSER WILL BLOCK REACHING THE BACKEND
app.use(express.json()); //THIS MIDDLEWARE WILL PARSE JSON STRING INTO JS OBJECT AND PUTS IN REQ.BODY

app.use(
  "/auth",
  authRoutes,
); /* AuthRoutes is itself a routing handler which has its own stack it can walk , it strips the auth and sends from the signup part */

app.use("/users", userRoutes); // PROFILE PAGE API HANDLER
app.use("/api", reviewRoutes); // to handle the submission data from the submit work page
export default app;

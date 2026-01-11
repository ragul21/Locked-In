import express from "express";
import authRoutes from "./routes/auth.route.js";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json()); //pushes the middleware functions into application level middleware stack , some built in middleware functions have next() called automatically , next() is important to progress further in the stack

app.use("/auth", authRoutes); //authRoutes is itself a routing handler which has its own stack it can walk

export default app;

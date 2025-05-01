import express from "express";

const authRouter = express.Router();

import authController from "../controller/auth.js";
authRouter.post("/login", authController.login);
authRouter.post("/logout", authController.logout);
authRouter.post("/refresh", authController.refresh);

export default authRouter;

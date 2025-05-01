import express from "express";

const userRouter = express.Router();

import userController from "../controller/user.js";

userRouter.get("/", userController.list);
userRouter.post("/", userController.create);
userRouter.get("/:id", userController.read);
userRouter.put("/:id", userController.update);
userRouter.patch("/:id", userController.update);
userRouter.delete("/:id", userController.delete);

export default userRouter;

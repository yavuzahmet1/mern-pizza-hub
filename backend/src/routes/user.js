import express from "express";

const router = express.Router();

import userController from "../controller/user.js";

router.get("/", userController.list);
router.post("/", userController.create);
router.get("/:id", userController.read);
router.put("/:id", userController.update);
router.patch("/:id", userController.update);
router.delete("/:id", userController.delete);

export default router;

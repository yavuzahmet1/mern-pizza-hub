import express from "express";

const router = express.Router();

import userController from "../controller/user.js";

router.route("/").get(userController.list).create(userController.create);

router
  .route("/:id")
  .get(userController.read)
  .put(userController.update)
  .patch(userController.update)
  .delete(userController.delete);

export default router;

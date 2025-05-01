import express from "express";

const toppingRouter = express.Router();

import toppingController from "../controller/topping.js";

toppingRouter.get("/", toppingController.list);
toppingRouter.post("/", toppingController.create);
toppingRouter.get("/:id", toppingController.read);
toppingRouter.put("/:id", toppingController.update);
toppingRouter.patch("/:id", toppingController.update);
toppingRouter.delete("/:id", toppingController.delete);

export default toppingRouter;

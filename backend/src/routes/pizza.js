import express from "express";

const pizzaRouter = express.Router();

import pizzaController from "../controller/order.js";

pizzaRouter.get("/", pizzaController.list);
pizzaRouter.post("/", pizzaController.create);
pizzaRouter.get("/:id", pizzaController.read);
pizzaRouter.put("/:id", pizzaController.update);
pizzaRouter.patch("/:id", pizzaController.update);
pizzaRouter.delete("/:id", pizzaController.delete);

export default pizzaRouter;

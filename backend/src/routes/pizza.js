import express from "express";
import upload from "../middlewares/upload.js";
import pizzaController from "../controller/pizza.js";

const pizzaRouter = express.Router();

pizzaRouter.get("/", pizzaController.list);
pizzaRouter.post("/", upload.single("image"), pizzaController.create);

pizzaRouter.get("/:id", pizzaController.read);
pizzaRouter.put("/:id", upload.single("image"), pizzaController.update);
pizzaRouter.patch("/:id", upload.single("image"), pizzaController.update);
pizzaRouter.delete("/:id", pizzaController.delete);

export default pizzaRouter;

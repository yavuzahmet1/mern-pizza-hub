import express from "express";

const orderRouter = express.Router();

import orderController from "../controller/order.js";

orderRouter.get("/", orderController.list);
orderRouter.post("/", orderController.create);
orderRouter.get("/:id", orderController.read);
orderRouter.put("/:id", orderController.update);
orderRouter.patch("/:id", orderController.update);
orderRouter.delete("/:id", orderController.delete);

export default orderRouter;

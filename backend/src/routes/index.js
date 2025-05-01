import express from "express";
import userRouter from "./user.js";
import pizzaRouter from "./pizza.js";
import orderRouter from "./order.js";

const router = express.Router();

router.use("/users", userRouter);
router.use("/orders", orderRouter);
router.use("/pizzas", pizzaRouter);

export default router;

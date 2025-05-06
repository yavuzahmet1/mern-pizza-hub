import express from "express";
import userRouter from "./user.js";
import pizzaRouter from "./pizza.js";
import orderRouter from "./order.js";
import toppingRouter from "./topping.js";
import authRouter from "./auth.js";
import logHttpRequest from "../middlewares/loggerHttp.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/orders", orderRouter);
router.use("/pizzas", pizzaRouter);
router.use("/toppings", toppingRouter);

export default router;

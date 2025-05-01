import express from "express";

const router = express.Router();

import orderController from "../controller/order.js";

router.get("/", orderController.list);
router.post("/", orderController.create);
router.get("/:id", orderController.read);
router.put("/:id", orderController.update);
router.patch("/:id", orderController.update);
router.delete("/:id", orderController.delete);

export default router;

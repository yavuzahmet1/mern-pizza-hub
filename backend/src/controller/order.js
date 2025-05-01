import Order from "../models/order.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const orderController = {
  list: asyncHandler(async (req, res) => {
    const result = await res.getModelList(Order);
    const details = await res.getModelListDetails(Order);
    res.status(200).send({ error: false, result, details });
  }),

  create: asyncHandler(async (req, res) => {
    const result = await Order.create(req.body);
    res.status(201).send({ error: false, result });
  }),

  read: asyncHandler(async (req, res) => {
    const result = await Order.findById(req.params.id);
    if (!result) {
      return res.status(404).send({ error: true, message: "Order not found" });
    }
    res.status(200).send({ error: false, result });
  }),

  update: asyncHandler(async (req, res) => {
    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).send({ error: true, message: "Order not found" });
    }

    const populated = await result.populate([
      { path: "userId", select: "name email" },
      { path: "pizzaId", select: "name price" },
    ]);

    res.status(200).send({ error: false, result: populated });
  }),

  delete: asyncHandler(async (req, res) => {
    const result = await Order.deleteOne({ _id: req.params.id });
    if (!result.deletedCount) {
      return res.status(404).send({
        error: true,
        message: "Order not found or already deleted",
      });
    }
    res.status(204).send();
    res
      .status(200)
      .send({ error: false, message: "Order deleted successfully" });
  }),
};

export default orderController;

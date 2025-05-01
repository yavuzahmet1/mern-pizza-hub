import Pizza from "../models/pizza.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const pizzaController = {
  list: asyncHandler(async (req, res) => {
    const result = await res.getModelList(Pizza);
    const details = await res.getModelListDetails(Pizza);
    res.status(200).send({ error: false, result, details });
  }),

  create: asyncHandler(async (req, res) => {
    req.body.toppingIds = [...new Set(req.body.toppingIds)];
    const result = await Pizza.create(req.body);
    res.status(201).send({ error: false, result });
  }),

  read: asyncHandler(async (req, res) => {
    const result = await Pizza.findById(req.params.id);
    if (!result) {
      return res.status(404).send({ error: true, message: "Pizza not found" });
    }
    res.status(200).send({ error: false, result });
  }),

  update: asyncHandler(async (req, res) => {
    const result = await Pizza.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!result) {
      return res
        .status(404)
        .send({ error: true, message: "Pizza not found or already deleted" });
    }

    const populated = await result.populate([
      { path: "userId", select: "name email" },
      { path: "pizzaId", select: "name price" },
    ]);

    res.status(200).send({ error: false, result: populated });
  }),

  delete: asyncHandler(async (req, res) => {
    const result = await Pizza.deleteOne({ _id: req.params.id });
    if (!result.deletedCount) {
      return res.status(404).send({
        error: true,
        message: "Pizza not found or already deleted",
      });
    }
    res
      .status(200)
      .send({ error: false, message: "Pizza deleted successfully" });
  }),
};

export default pizzaController;

import Topping from "../models/topping.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const toppingController = {
  list: asyncHandler(async (req, res) => {
    const result = await res.getModelList(Topping, "toppingIds");
    const details = await res.getModelListDetails(Topping);
    res.status(200).send({ error: false, result, details });
  }),

  create: asyncHandler(async (req, res) => {
    req.body.toppingIds = [...new Set(req.body.toppingIds)];
    const result = await Topping.create(req.body);
    res.status(201).send({ error: false, result });
  }),

  read: asyncHandler(async (req, res) => {
    const result = await Topping.findById(req.params.id);
    if (!result) {
      return res
        .status(404)
        .send({ error: true, message: "Topping not found" });
    }
    res.status(200).send({ error: false, result });
  }),

  update: asyncHandler(async (req, res) => {
    const result = await Topping.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!result) {
      return res
        .status(404)
        .send({ error: true, message: "Topping not found or already deleted" });
    }

    const populated = await result.populate([
      { path: "userId", select: "name email" },
      { path: "toppingId", select: "name price" },
    ]);

    res.status(200).send({ error: false, result: populated });
  }),

  delete: asyncHandler(async (req, res) => {
    const result = await Topping.deleteOne({ _id: req.params.id });
    if (!result.deletedCount) {
      return res.status(404).send({
        error: true,
        message: "Topping not found or already deleted",
      });
    }
    res
      .status(200)
      .send({ error: false, message: "Topping deleted successfully" });
  }),
};

export default toppingController;

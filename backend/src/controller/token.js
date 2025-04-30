import Token from "../models/token.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const tokenController = {
  list: asyncHandler(async (req, res) => {
    const result = await res.getModelList(Token);
    const details = await res.getModelListDetails(Token);
    res.status(200).send({ error: false, result, details });
  }),

  create: asyncHandler(async (req, res) => {
    const result = await Token.create(req.body);
    res.status(201).send({ error: false, result });
  }),

  read: asyncHandler(async (req, res) => {
    const result = await Token.findById(req.params.id);
    if (!result) {
      return res.status(404).send({ error: true, message: "Token not found" });
    }
    res.status(200).send({ error: false, result });
  }),

  update: asyncHandler(async (req, res) => {
    const result = await Token.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!result) {
      return res.status(404).send({ error: true, message: "Token not found" });
    }
    res.status(200).send({ error: false, result });
  }),

  delete: asyncHandler(async (req, res) => {
    const result = await Token.deleteOne({ _id: req.params.id });
    if (!result.deletedCount) {
      return res.status(404).send({
        error: true,
        message: "Token not found or already deleted",
      });
    }
    res.status(204).send();
  }),
};

export default tokenController;

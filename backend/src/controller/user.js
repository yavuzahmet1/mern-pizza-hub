import User from "../models/user.js";

const userController = {
  list: async (req, res) => {
    const result = await res.getModelList(User);
    res.status(200).send({
      error: false,
      details: await res.getModelList(User),
      result,
    });
  },
  create: async (req, res) => {
    res.status(200).send({
      error: false,
      result,
    });
  },
  read: async (req, res) => {
    res.status(200).send({
      error: false,
      result,
    });
  },
  update: async (req, res) => {
    res.status(200).send({
      error: false,
      result,
    });
  },
  delete: async (req, res) => {
    res.status(200).send({
      error: false,
      result,
    });
  },
};

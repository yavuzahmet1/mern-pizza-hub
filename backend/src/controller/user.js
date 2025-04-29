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
    try {
      // Çakışma kontrolü
      const existingUser = await User.findOne({
        $or: [{ email: req.body.email }, { username: req.body.username }],
      });

      if (existingUser) {
        return res.status(409).send({
          error: true,
          message: "User already exists with this email or username",
        });
      }

      const result = await User.create(req.body);

      res.status(201).send({
        error: false,
        result,
      });
    } catch (err) {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          error: true,
          message: err.message,
        });
      }
    }
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

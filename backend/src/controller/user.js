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
    const result = await User.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      result,
    });
  },
  update: async (req, res) => {
    const result = await User.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res
      .status(200)
      .send({
        error: false,
        result,
      })
      .select("-password");
  },
  delete: async (req, res) => {
    try {
      const result = await User.deleteOne({ _id: req.params.id });

      if (!result.deletedCount) {
        return res.status(404).send({
          error: true,
          message: "User not found or already deleted",
        });
      }
      return res.status(204).send();
    } catch (err) {
      console.error("Delete user error:", err);

      res.status(500).send({
        error: true,
        message: "Server error during user deletion",
        systemMessage:
          process.env.NODE_ENV === "development" ? err.message : undefined,
      });
    }
  },
};

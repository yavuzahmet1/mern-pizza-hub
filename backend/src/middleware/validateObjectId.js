import mongoose from "mongoose";

const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send({ error: true, message: "Invalid ID format" });
  }
  next();
};

export default validateObjectId;

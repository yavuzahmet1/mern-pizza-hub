import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    token: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  { collection: "Token" }
);

const Token = mongoose.model("Token", TokenSchema);
export default Token;

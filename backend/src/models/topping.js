import mongoose from "mongoose";

const ToppingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
  },
  { collection: "toppings", timestamps: true }
);

const Topping = mongoose.model("Topping", ToppingSchema);
export default Topping;

import mongoose from "mongoose";

const PizzaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: String,
    price: {
      type: Number,
      required: true,
    },
    toppingIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topping",
      },
    ],
  },
  { collection: "pizzas", timestamps: true }
);

const Pizza = mongoose.model("Pizza", PizzaSchema);
export default Pizza;

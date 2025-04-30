import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pizzaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pizza",
      required: true,
    },
    size: {
      type: String,
      trim: true,
      required: true,
      enum: ["Small", "Medium", "Large", "XLarge"],
    },
    quantity: {
      type: Number,
      default: 1,
      min:1
    },
    price: {
      type: Number,
      required: true,
    },
    totalPrice: {
        type: Number,
      },
    },
  },
  { collection: "Order", timestamps: true }
);

OrderSchema.pre("save", function (next) {
  this.totalPrice = this.quantity * this.price;
  next();
});
const Order = mongoose.model("Order", OrderSchema);
export default Order;

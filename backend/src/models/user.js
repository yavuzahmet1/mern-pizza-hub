import mongoose from "mongoose";
import { hashPassword } from "../helper/passwordEncrypt.js";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      validate: [
        (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
        "please enter a valid e-mail address",
      ],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "users", timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      this.password = await hashPassword(this.password);
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

const User = mongoose.model("User", UserSchema);
export default User;

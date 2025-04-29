import mongoose from "mongoose";
import { passwordEncrypt } from "../helper/passwordEncrypt.js";

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
      trim: true,
      required: true,
      set: (password) => passwordEncrypt(password),
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
      type: true,
      default: false,
    },
  },
  { collection: "users", timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;

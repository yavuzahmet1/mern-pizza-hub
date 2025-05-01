import CustomError from "../helper/customError.js";
import User from "../models/user.js";
import Token from "../models/token.js";
import { passwordEncrypt } from "../helper/passwordEncrypt.js";

const authController = {
  login: async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!((username || email) && password)) {
      throw new CustomError("Username/email and password are required", 401);
    }
    const user = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (!user)
      throw new CustomError("Incorrect email/username or password", 401);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new CustomError("Incorrect email/username or password", 401);

    if (!user.isActive) throw new CustomError("This account is not active");

    let tokenData = await Token.findOne({ userId: user._id });

    if (!tokenData) {
      tokenData = await Token.create({
        userId: user._id,
        token: passwordEncrypt(Date.now() + user._id),
      });
    }

    res.status(200).send({
      error: false,
      token: tokenData.token,
      user: user,
      message: "ok",
    });
  },
  logout: async (req, res) => {
    res.status(200).send({
      error: false,
      message: "ok",
    });
  },
  refresh: async (req, res) => {
    res.status(200).send({
      error: false,
      message: "ok",
    });
  },
};

export default authController;

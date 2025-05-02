import CustomError from "../helper/customError.js";
import User from "../models/user.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import Token from "../models/token.js";
import { hashPassword } from "../helper/passwordEncrypt.js";
import jwt from "jsonwebtoken";

const authController = {
  login: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!((username || email) && password)) {
      throw new CustomError("e-mail/username and password are required", 401);
    }

    const user = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (!user)
      throw new CustomError("Incorrect email/username or password", 401);

    const hashedPassword = hashPassword(password);

    if (hashedPassword !== user.password) {
      throw new CustomError("Incorrect email/username or password", 401);
    }

    if (!user.isActive) throw new CustomError("This account is not active");

    const accessToken = jwt.sign(
      { userId: user._id, username: user.username, email: user.email },
      process.env.ACCESS_KEY,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_KEY,
      { expiresIn: "7d" }
    );

    let tokenData = await Token.findOne({ userId: user._id });

    if (!tokenData) {
      tokenData = await Token.create({
        userId: user._id,
        token: refreshToken,
      });
    } else {
      tokenData.token = refreshToken;
      await tokenData.save();
    }

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, //js okumasını engelliyormuş
      secure: process.env.NODE_ENV === "production", //https de çalışıyormuş
      sameSite: "Strict", // CSRF Cross-Site Request Forgery aynı site
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 day
    });

    const userResponse = user.toObject();
    delete userResponse.password;
    delete userResponse.__v;

    res.status(200).json({
      error: false,
      bearer: {
        access: accessToken,
        refresh: refreshToken,
      },
      userResponse,
      message: "ok",
    });
  }),

  logout: asyncHandler(async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(200).json({
        error: false,
        message: "Logout success",
      });
    }

    await Token.findOneAndDelete({ token: refreshToken });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.status(200).json({
      error: false,
      message: "Logout success",
    });
  }),

  refresh: asyncHandler(async (req, res) => {
    const refreshToken = req.cookies?.refreshToken || req.body.refreshToken;

    // 2. Refresh token yoksa hata döndür
    if (!refreshToken) {
      throw new CustomError("Refresh token is required", 400);
    }

    try {
      // 3. Refresh token'ı doğrula
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_KEY);

      // 4. Token geçerli ise yeni bir access token oluştur
      const accessToken = jwt.sign(
        {
          userId: decoded.userId,
          username: decoded.username,
          email: decoded.email,
        },
        process.env.ACCESS_KEY,
        { expiresIn: "15m" }
      );

      // 5. Refresh token'ın geçerliliğini veritabanında kontrol et
      const tokenData = await Token.findOne({ token: refreshToken });

      if (!tokenData) {
        throw new CustomError("Invalid refresh token", 401);
      }

      // 6. Yeni access token ile başarılı yanıt
      res.status(200).json({
        error: false,
        bearer: {
          access: accessToken,
        },
        message: "Token refreshed successfully",
      });
    } catch (err) {
      // 7. Refresh token geçersiz veya süresi dolmuşsa hata döndür
      throw new CustomError("Invalid or expired refresh token", 401);
    }
  }),
};

export default authController;

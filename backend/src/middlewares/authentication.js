import Token from "../models/token.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../middlewares/asyncHandler.js";

const authentication = asyncHandler(async (req, res, next) => {
  req.user = null;

  const authHeader = req.headers?.authorization;
  if (!authHeader) return next();

  const [type, token] = authHeader.split(" ");
  if (!token) return next();

  if (type === "Token") {
    const tokenData = await Token.findOne({ token }).populate("userId");
    req.user = tokenData ? tokenData.userId : null;
  } else if (type === "Bearer") {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_KEY);
      req.user = decoded;
    } catch (err) {
      req.user = null;
    }
  }

  next();
});

export default authentication;

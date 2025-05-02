// config/email.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import asyncHandler from "../utils/asyncHandler.js";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

const sendEmail = asyncHandler(async (mailOptions) => {
  const info = await transporter.sendMail({
    from: `"${process.env.EMAIL_SENDER_NAME}" <${process.env.EMAIL_USER}>`,
    ...mailOptions,
  });

  console.log("Message sent: %s", info.messageId);
  return info;
});

export default sendEmail;

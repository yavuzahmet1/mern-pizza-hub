import crypto from "node:crypto";

const keyCode = process.env.SECRET_KEY;
const loopCount = 10_000;
const charCount = 32;
const encType = "sha512";

export const hashPassword = (password) => {
  return crypto
    .pbkdf2Sync(password, keyCode, loopCount, charCount, encType)
    .toString("hex");
};

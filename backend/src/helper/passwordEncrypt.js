import { pbkdf2 } from "node:crypto";

const keyCode = process.env.SECRET_KEY;
const loopCount = 10_000;
const charCount = 32;
const encType = "sha512";

export async function passwordEncrypt(password) {
  return new Promise((resolve, reject) => {
    pbkdf2(
      password,
      keyCode,
      loopCount,
      charCount,
      encType,
      (err, derivedKey) => {
        if (err) return reject(err);
        resolve(derivedKey.toString("hex"));
      }
    );
  });
}

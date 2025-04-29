import morgan from "morgan";
import fs from "node:fs";

const now = new Date();
const today = now.toISOString().split("T")[0];

export default morgan("combined", {
  stream: fs.createWriteStream(`./logs/${today}.log`, { flags: "a+" }),
});

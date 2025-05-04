import winston from "winston";
import WinstonDailyRotateFile from "winston-daily-rotate-file";

const { combine, timestamp, printf, errors } = winston.format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}] ${stack || message}`;
});

const logger = winston.createLogger({
  level: "info",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }),
    logFormat
  ),
  transports: [
    new WinstonDailyRotateFile({
      filename: "logs/application-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
  ],
});

export default logger;

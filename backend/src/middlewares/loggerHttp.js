import logger from "../config/logger.js";

// HTTP isteklerini loglamak için middleware
const logHttpRequest = (req, res, next) => {
  // Loglama: İstek bilgilerini logla
  logger.info(`HTTP ${req.method} ${req.url} - ${req.ip}`);

  // Middleware zincirini devam ettir
  next();
};

export default logHttpRequest;

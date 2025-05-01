const errorHandler = (err, req, res, next) => {
  console.log("🚨 Error:", err);

  const isDev = process.env.NODE_ENV === "development";

  res.status(err.statusCode || res?.statusCode || 500).json({
    error: true,
    message: err.message || "Internal Server Error",
    ...(isDev && { stack: err.stack }),
  });
};

export default errorHandler;

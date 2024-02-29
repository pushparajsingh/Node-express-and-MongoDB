const errorMiddleware = (err,res,data=[]) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;
  err.success = err.success || false;
  return res.status(err.statusCode).json({
    status: err.statusCode,
    success: err.success,
    message: err.message,
    data
  });
};

module.exports = errorMiddleware;

const AppError = require("../utils/AppError");

const handleCastError = (err) => {
  return new AppError(`invalid ${err.path}:${err.value}`, 400);
};

const handleValidationError = () => {
  return new AppError("validation error", 400);
};

const handleTokenExpiredError = () => {
  return new AppError("token expired please login again", 401);
};

const devErr = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    stack: err.stack,
    message: err.message,
  });
};

const prodError = (err, res) => {
  if (err.isOperational) {
    res
      .status(err.statusCode)
      .json({ status: err.status, message: err.message });
  } else {
    res.status(500).json({
      status: "error",
      message: "something went wrong!",
    });
  }
};

exports.errorController = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV.trim() === "production") {
    if (err.name === "CastError") err = handleCastError(err);
    if (err.name === "ValidationError") err = handleValidationError(err);
    if (err.name === "TokenExpiredError") err = handleTokenExpiredError(err);
    if (err.code === "11000" && err.keyPattern.day === 1)
      err = handleDuplicateKeyError(err, next);
    prodError(err, res);
  } else if (process.env.NODE_ENV.trim() === "development") {
    devErr(err, res);
  }
};

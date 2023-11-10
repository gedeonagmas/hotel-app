const AppError = require("../utils/AppError");

exports.authorization = (val) => (req, res, next) => {
  if (!val.includes(req.user.role))
    return next(
      new AppError("you are not authorized to perform this actions", 404)
    );
  next();
};

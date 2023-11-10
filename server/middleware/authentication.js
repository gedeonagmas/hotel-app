const { User } = require("../models/signupModel");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

exports.authentication = async (req, res, next) => {
  // console.log(req.headers);
  let token, user;
  const header = req.headers.authorization;
  if (header && header.startsWith("Bearer") && header !== "null")
    token = header;

  if (token === "null" || !token)
    return next(new AppError("Tokens not found please login again"));

  const decode = await promisify(jwt.verify)(
    token.split(" ")[1],
    process.env.JWT_SECRET_KEY
  );

  user = await User.findById(decode.id);
  if (!user) return next(new AppError("users not found", 404));

  if (await user.isPasswordChanged(decode.iat))
    return next(
      new AppError(
        ".you have recently changed your password # please login again",
        400
      )
    );
  req.user = user;
  next();
};

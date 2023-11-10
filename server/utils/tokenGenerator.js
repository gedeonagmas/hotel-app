const jwt = require("jsonwebtoken");

exports.tokenGenerator = (res, id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  // const cookieOption = {
  //   expires: new Date(
  //     Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
  //   ),
  //   httpOnly: true,
  //   //secure:true     only for production
  // };
  // res.cookie("jwt", token, cookieOption);
  return token;
};

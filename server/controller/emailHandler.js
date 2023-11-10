const asyncCatch = require("express-async-catch");
const sendEmail = require("./../utils/nodeMailer");
const AppError = require("../utils/AppError");

exports.sendEmailHandler = asyncCatch(async (req, res, next) => {
  //   try {
  const data = await sendEmail({
    from: "GYMATE <gymate@gmail.com>",
    email: "gedeonagmas2580@gmail.com",
    subject: `new email received from GYMATE sender: ${req.body.fullName} email: ${req.body.email}`,
    message: req.body.description,
  });

  if (!data) {
    return next(new AppError("Something went wrong, Email not sent", 400));
  }

  return res.status(200).json({
    status: "SENT",
    message: "Email Sent Successfully. We Really Appreciate your Support",
  });
  //   } catch (err) {
  //     return next(new AppError("connection problem please try again", 500));
  //   }
});

const asyncCatch = require("express-async-catch");
const { Transaction } = require("../models/transactionModel");
const AppError = require("../utils/AppError");
const { User } = require("../models/signupModel");

exports.createTransaction = asyncCatch(async (req, res, next) => {
  const { amount, hotel } = req.body;
  const data = await Transaction.create({
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    userName: req.user.userName,
    email: req.user.email,
    phone: req.user.phone,
    city: req.user.city,
    profilePicture: req.user.profilePicture,
    hotel: hotel,
    date: Date.now(),
    price: amount,
    method: "Chappa",
    status: "Payed",
  });
  return res.status(200).json({
    status: "Payed",
    message: "Payment successful",
    data,
  });
});

exports.readTransaction = asyncCatch(async (req, res, next) => {
  let param = req.query.id
    ? { _id: req.query.id, deleted: false }
    : { deleted: false };
  const data = await Transaction.find(param).sort("-date");

  res.status(200).json({
    status: "Read",
    length: data.length,
    data,
  });
});

exports.updateTransaction = asyncCatch(async (req, res, next) => {
  const data = await Transaction.findByIdAndUpdate(req.query.id, {
    $set: { ...req.body },
  });

  if (!data)
    return next(new AppError("Error unable to update transaction", 400));

  res.status(200).json({
    status: "Updated",
    message: "transaction updated successfully",
  });
});

exports.deleteTransaction = asyncCatch(async (req, res, next) => {
  const data = await Transaction.findByIdAndUpdate(req.query.id, {
    $set: { deleted: true },
  });

  if (!data)
    return next(new AppError("Error unable to update transaction", 400));

  res.status(200).json({
    status: "Deleted",
    message: "transaction Deleted successfully",
    data,
  });
});

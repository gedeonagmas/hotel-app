const AppError = require("../utils/AppError");
const asyncCatch = require("express-async-catch");
const { User } = require("../models/signupModel");
const { Transaction } = require("../models/transactionModel");
const { Hotel } = require("../models/hotelModel");
const { Rate } = require("../models/rateModel");
const { upload } = require("./../utils/upload");
const cloudinary = require("./../config/cloudinary");

exports.create = asyncCatch(async (req, res, next) => {
  if (!req.files || !req.files.images)
    return next(new AppError("you must select at least 1 hotel image", 400));

  let images = [];
  req.files.images.map(async (gallery) => {
    cloudinary.uploader.upload(gallery.path, async function (err, result) {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ message: "something went wrong hotel not created" });
      }
      images.push(result.url);
    });
    return images;
  });

  const data = await Hotel.create({
    ...req.body,
    images: [...images],
  });

  return res.status(201).json({
    status: "Created",
    message: "hotel created successfully",
    data,
  });
});

exports.read = (model, type) =>
  asyncCatch(async (req, res, next) => {
    const total = await model.find({ visible: true });
    const params = { ...req.query, deleted: false };
    const remove = ["sort", "page", "limit", "type"];
    remove.forEach((el) => delete params[el]);

    const filter = JSON.parse(
      JSON.stringify(params).replace(
        /\b(gte|lte|lt|gt|eq|neq)\b/g,
        (match) => `$${match}`
      )
    );

    const tempData = model.find(filter);
    req.query.sort
      ? tempData.sort(req.query.sort.split(",").join(" "))
      : tempData.sort("-createdAt");

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || null;
    const skip = (page - 1) * limit;
    tempData.skip(skip).limit(limit);

    const data = await tempData;

    if (page) {
      const dd = await model.countDocuments({ deleted: false });
      if (skip >= dd)
        return next(new AppError("you are in the last page", 404));
    }
    if (data.length < 1)
      return next(new AppError("There is no data to display", 400));

    res.status(200).json({
      status: "success",
      length: data.length,
      total: total.length,
      data: data,
    });
  });

exports.update = (model, type) =>
  asyncCatch(async (req, res, next) => {
    const lengths = await model.find({ deleted: false }).countDocuments();
    if (type === "hotel" && lengths < 5) {
      return next(
        new AppError(
          "You can't delete the hotel, there must be at least 4 hotel"
        )
      );
    }

    const data = await model.findByIdAndUpdate(req.query.id, {
      $set: { deleted: true },
    });

    if (!data)
      return next(new AppError("Error unable to update the document", 404));

    res
      .status(201)
      .json({ status: "Updated", message: "document updated successfully" });
  });

exports.classUsersTransactionsHandler = asyncCatch(async (req, res, next) => {
  const users = await User.find({
    role: "user",
    deleted: false,
  }).countDocuments();
  const hotels = await Hotel.find({ deleted: false }).countDocuments();
  const transactions = await Transaction.find({
    deleted: false,
  }).countDocuments();
  const rates = await Rate.find({ deleted: false }).countDocuments();

  res.status(200).json({ hotels, users, transactions, rates });
});

exports.createRate = asyncCatch(async (req, res, next) => {
  const data = await Rate.find({
    user: req.body.user,
    hotel: req.body.hotel,
    deleted: false,
  });
  let message = "your rate is created successfully";
  if (data.length > 0) {
    await Rate.findOneAndDelete({
      user: req.body.user,
      hotel: req.body.hotel,
      deleted: false,
    });
    message = "your rate is just updated";
  }
  await Rate.create(req.body);
  const d = await Rate.find({
    hotel: req.body.hotel,
    user: req.body.user,
    deleted: false,
  });
  let sum = 0;
  d.map((e) => {
    sum = sum + e.value;
    return sum;
  });

  const hotel = await Hotel.findOne({ _id: req.body.hotel, deleted: false });
  hotel.totalRating = (sum / d.length).toFixed(1);
  await hotel.save();
  res.status(200).json({ status: "Created", message });
});

exports.readRate = asyncCatch(async (req, res, next) => {
  const data = await Rate.find({ hotel: req.query.id, deleted: false }).sort(
    "-createdAt"
  );
  res.status(200).json({
    status: "Read",
    message: "you rate this hotel successfully",
    data,
  });
});

exports.readMultipleRate = asyncCatch(async (req, res, next) => {
  const data = await Rate.find({ deleted: false }).sort("-createdAt");
  res.status(200).json({
    status: "Read",
    data,
  });
});

exports.deleteRate = asyncCatch(async (req, res, next) => {
  const data = await Rate.findByIdAndUpdate(req.query.id, {
    $set: { deleted: true },
  });
  res.status(200).json({
    status: "Deleted",
    message: "rate deleted successfully",
    data,
  });
});

const mongoose = require("mongoose");

const rateSchema = new mongoose.Schema({
  fullName: String,
  hotel: String,
  comment: String,
  user: String,
  value: Number,
  createdAt: { type: Number, default: Date.now() },
  deleted: { type: Boolean, default: false },
});

exports.Rate = mongoose.model("rates", rateSchema);

const mongoose = require("mongoose");
const { Rate } = require("./rateModel");

const hotelSchema = new mongoose.Schema(
  {
    name: String,
    distance: Number,
    specialService: String,
    city: String,
    location: String,
    deluxe: Number,
    twoBed: Number,
    penthouse: Number,
    startRoom: Number,
    lastRoom: Number,
    description: String,
    phone: String,
    price: Number,
    images: [String],
    totalRating: Number,
    createdAt: {
      type: Number,
      default: Date.now(),
    },
    deleted: { type: Boolean, default: false },
    visible: {
      type: Boolean,
      default: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

exports.Hotel = mongoose.model("hotels", hotelSchema);

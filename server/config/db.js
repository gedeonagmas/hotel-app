const mongoose = require("mongoose");
const mongodb = async () => {
  await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
  console.log("hotel database connected successfully");
};

module.exports = mongodb;

const express = require("express");
require("dotenv").config();
const path = require("path");
const cors = require("cors");
const app = express();
const router = require("./routes/routes");
const { errorController } = require("./controller/errorController");
const mongodb = require("./config/db");

app.use(
  cors({
    origin: ["https://gedi-client.vercel.app"],
    methods: ["POST", "GET", "PATCH", "DELETE", "PUT"],
    credentials: true,
  })
);
process.on("uncaughtException", (err) => {
  console.log("SHUTTING DOWN");
  console.log(err.name, err.message);
  process.exit(1);
});

app.use(express.json());
app.use("/hotel/app/v1", router);

app.all("*", (req, res, next) => {
  res.status(200).json({ message: `${req.originalUrl} is invalid url` });
  next();
});

app.use(errorController);

app.get("/", (req, res, next) => {
  res.send("hello well come to my hotel app");
});
mongodb()
  .then(() => {
    app.listen(process.env.PORT, (err) => {
      if (err) console.log(err);
      console.log("hotel server connected on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

process.on("unhandledRejection", (err) => {
  console.log("SHUTTING DOWN");
  console.log(err.message, err.name);
  server.close(() => {
    process.exit(1);
  });
});


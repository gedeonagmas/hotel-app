const express = require("express");
const router = express.Router();
const { authorization } = require("../middleware/authorization");
const { authentication } = require("../middleware/authentication");
const {
  passwordResetValidator,
  changePasswordValidator,
  emailSendValidator,
  hotelValidator,
  rateValidator,
} = require("../utils/validator");
const { upload } = require("../utils/upload");
const { Hotel } = require("../models/hotelModel");
const { User } = require("../models/signupModel");

const {
  signupValidator,
  validationHelper,
  updateInfoValidator,
} = require("./../utils/validator");

const {
  signupHandler,
  loginHandler,
  getUsersHandler,
  forgetPassword,
  resetPassword,
  updateProfileInfo,
  updateProfilePicture,
  readProfileInfo,
  updatePassword,
  getMyDataHandler,
} = require("./../controller/userController");

const {
  create,
  read,
  update,
  classUsersTransactionsHandler,
  createRate,
  readRate,
  deleteRate,
  readMultipleRate,
} = require("../controller/factoryController");

const {
  createTransaction,
  readTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controller/transactionController");

const { sendEmailHandler } = require("../controller/emailHandler");

const files = upload.fields([
  { name: "profilePicture", maxCount: 1 },
  { name: "images", maxCount: 15 },
]);

router
  .route("/signup")
  .post(files, signupValidator, validationHelper("none"), signupHandler);

router.route("/login").post(loginHandler);

router.route("/getAllUsers").get(authentication, getUsersHandler);

router.route("/readMyData").get(authentication, getMyDataHandler);

router.route("/readProfileInfo").get(authentication, readProfileInfo);

router.route("/forgetPassword").post(forgetPassword);

router
  .route("/resetPassword")
  .post(passwordResetValidator, validationHelper("none"), resetPassword);

router
  .route("/updateProfileInfo")
  .patch(
    authentication,
    updateInfoValidator,
    validationHelper("none"),
    updateProfileInfo
  );

router
  .route("/updateProfilePicture")
  .patch(
    authentication,
    files,
    validationHelper("profilePicture"),
    updateProfilePicture
  );

router
  .route("/changePassword")
  .patch(
    authentication,
    changePasswordValidator,
    validationHelper("none"),
    updatePassword
  );

router
  .route("/hotels")
  .post(
    authentication,
    authorization(["admin"]),
    files,
    hotelValidator,
    validationHelper("images"),
    create
  )
  .get(read(Hotel, "hotels"))
  .patch(authentication, authorization(["admin"]), update(Hotel, "hotel"));

router
  .route("/users")
  .patch(authentication, authorization(["admin"]), update(User, "user"));

router
  .route("/transactions")
  .post(authentication, authorization(["user", "admin"]), createTransaction)
  .get(authentication, readTransaction)
  .patch(authentication, authorization(["admin"]), updateTransaction)
  .delete(authentication, authorization(["admin"]), deleteTransaction);

router.route("/trainer").get(async (req, res, next) => {
  res
    .status(200)
    .json({ status: "success", data: await User.find({ role: "trainer" }) });
});

router
  .route("/sendEmail")
  .post(emailSendValidator, validationHelper("none"), sendEmailHandler);

router
  .route("/rate")
  .post(rateValidator, validationHelper("none"), createRate)
  .get(readRate)
  .delete(authentication, authorization(["admin"]), deleteRate);

router.route("/rateMultiple").get(readMultipleRate);

router
  .route("/hotels-users-transactions")
  .get(authentication, authorization(["admin"]), classUsersTransactionsHandler);

module.exports = router;

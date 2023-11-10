const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const signupSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    userName: String,
    email: String,
    phone: String,
    city: String,
    role: { type: String, default: "user" },
    password: { type: String, select: false },
    confirmPassword: String,
    profilePicture: {
      type: String,
      default:
        "https://res.cloudinary.com/dkvjvnil8/image/upload/v1689691516/defaultProfile.jpg",
    },
    modifiedDate: Number,
    createdAt: { type: Number, default: Date.now() },
    deleted: { type: Boolean, default: false },
    passwordChangedAt: Number,
    resetToken: String,
    resetTokenExpires: Number,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

signupSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

signupSchema.methods.passwordCheck = async (
  currentPassword,
  candidatePassword
) => {
  return await bcrypt.compare(candidatePassword, currentPassword);
};

signupSchema.methods.isPasswordChanged = async function (iat) {
  return iat <= parseInt(this.passwordChangedAt / 1000, 10);
};

signupSchema.methods.createResetToken = async function () {
  const resetToken = await crypto.randomBytes(32).toString("hex");
  this.resetToken = await crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetTokenExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

signupSchema.methods.isTokenExpired = async function () {
  return this.resetTokenExpires < Date.now();
};

signupSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() + 1000;
  next();
});

exports.User = mongoose.model("users", signupSchema);

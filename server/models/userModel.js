const mongoose = require(`mongoose`);
const bcrypt = require(`bcryptjs`);
const validator = require(`validator`);

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, `User email required.`],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, `User email is invalid.`],
    },
    password: {
      type: String,
      required: [true, `Password required.`],
    },
    phone: {
      type: Number,
      required: [true, `User phone number required.`],
      min : 1000000000,
      max : 9999999999
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual(`events`, {
  ref: `Event`,
  foreignField: `user`,
  localField: `_id`,
});

//ENCRYPT PASSWORD
userSchema.pre(`save`, async function (next) {
  if (!this.isModified(`password`)) return next(); //IF PASSWORD NOT BEING MODIFIED, DO NOT ENCRYPT
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

//FOR authController.login - COMPARE ENTERED PASSWORD TO STORED PASSWORD
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model(`User`, userSchema);
module.exports = User;

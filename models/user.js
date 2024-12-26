const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const {FIELD_MUST_BE_FILLED, INCORRECT_EMAIL, INCORRECT_EMAIL_OR_PASSWORD,
  MIN_LENGTH, MAX_LENGTH} = require("../utils/constants");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, FIELD_MUST_BE_FILLED.replace("$field", "name")],
    minlength: [2, MIN_LENGTH.replace("$field", "name")],
    maxlength: [30, MAX_LENGTH.replace("$field", "name")],
  },
  email: {
    type: String,
    required: [true, FIELD_MUST_BE_FILLED.replace("$field", "email")],
    unique: true,
    index: { unique: true },
    validate: {
      validator: (v) => validator.isEmail(v),
      message: INCORRECT_EMAIL,
    },
  },
  password: {
    type: String,
    required: [true, FIELD_MUST_BE_FILLED.replace("$field", "password")],
    select: false,
  },
}, { versionKey: false });

userSchema.set('toJSON', {
  transform(doc, ret) {
    delete ret.password;
    return ret;
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(INCORRECT_EMAIL_OR_PASSWORD));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error(INCORRECT_EMAIL_OR_PASSWORD));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);

const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.userName = !isEmpty(data.userName) ? data.userName : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isLength(data.userName, { min: 2, max: 30 })) {
    errors.userName = "userName must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.userName)) {
    errors.userName = "userName field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

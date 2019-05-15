const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.userName = !isEmpty(data.userName) ? data.userName : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.userName)) {
    errors.userName = "Proszę podać nazwę użytkownika";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Proszę podać hasło";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

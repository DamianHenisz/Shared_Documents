const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.userName = !isEmpty(data.userName) ? data.userName : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isLength(data.userName, { min: 2, max: 30 })) {
    errors.userName = "Nazwa użytkownika musi zawierać od 2 do 30 znaków";
  }

  if (Validator.isEmpty(data.userName)) {
    errors.userName = "Podaj nazwę użytkownika";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Podaj hasło";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Hasło musi mieć co najmniej 6 znaków";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const Joi = require("@hapi/joi");

// Registration validation
const registerValidation = (data) => {
  const schema = {
    username: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  };
  return Joi.validate(data, schema);
};

// Login validation
const loginValidation = (data) => {
  const schema = {
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  };
  return Joi.validate(data, schema);
};

// Change email validation
const changeEmailValidation = (data) => {
  const schema = {
    email: Joi.string().min(6).required().email(),
  };
  return Joi.validate(data, schema);
};

// Change username validation
const changeUsernameValidation = (data) => {
  const schema = {
    username: Joi.string().min(3).required(),
  };
  return Joi.validate(data, schema);
};

// Change password validation
const changePasswordValidation = (data) => {
  const schema = {
    password: Joi.string().min(6).required(),
  };
  return Joi.validate(data, schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.changeEmailValidation = changeEmailValidation;
module.exports.changeUsernameValidation = changeUsernameValidation;
module.exports.changePasswordValidation = changePasswordValidation;

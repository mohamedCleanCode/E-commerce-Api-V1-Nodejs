const { validationResult } = require("express-validator");
// @desc Find the validation errors in the requset and wrap them in an object with a handy fuction

const validatorLayer = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.send({ errors: result.array() });
  }
  next();
};

module.exports = validatorLayer;

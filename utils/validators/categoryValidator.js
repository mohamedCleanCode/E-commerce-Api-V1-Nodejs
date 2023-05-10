const { param } = require("express-validator");
const validatorLayer = require("../../middlewares/validatorLayer");

exports.getCategoryValidator = [
  param("id").isMongoId().withMessage("Invalid Id"),
  validatorLayer,
];

const { check } = require("express-validator");
const validatorLayer = require("../../middlewares/validatorLayer");

exports.getBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Id"),
  validatorLayer,
];

exports.createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("Brand name is required")
    .isLength({
      min: 3,
      max: 32,
    })
    .withMessage("Brand name must be 3 to 32 character"),
  validatorLayer,
];

exports.updateBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Id"),
  validatorLayer,
];

exports.deleteBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Id"),
  validatorLayer,
];

const { check } = require("express-validator");
const validatorLayer = require("../../middlewares/validatorLayer");

exports.getCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Id"),
  validatorLayer,
];

exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({
      min: 3,
      max: 32,
    })
    .withMessage("Category name must be 3 to 32 character"),
  validatorLayer,
];

exports.updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Id"),
  validatorLayer,
];

exports.deleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Id"),
  validatorLayer,
];

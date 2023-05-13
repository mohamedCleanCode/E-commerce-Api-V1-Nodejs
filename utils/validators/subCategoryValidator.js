const { check } = require("express-validator");
const validatorLayer = require("../../middlewares/validatorLayer");

exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("SubCategory name is required")
    .isLength({
      min: 2,
      max: 32,
    })
    .withMessage("SubCategory name must be 2 to 32 character"),
  check("category")
    .notEmpty()
    .withMessage("Category name is required")
    .isMongoId()
    .withMessage("Invalid category id"),
  validatorLayer,
];

exports.getSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Id"),
  validatorLayer,
];

exports.updateSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Id"),
  check("name")
    .notEmpty()
    .withMessage("SubCategory name is required")
    .isLength({
      min: 2,
      max: 32,
    })
    .withMessage("SubCategory name must be 2 to 32 character"),
  check("category")
    .notEmpty()
    .withMessage("Category name is required")
    .isMongoId()
    .withMessage("Invalid category id"),

  validatorLayer,
];

exports.deleteSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Id"),
  validatorLayer,
];

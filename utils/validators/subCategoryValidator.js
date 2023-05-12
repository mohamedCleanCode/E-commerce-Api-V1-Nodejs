const { check } = require("express-validator");
const validatorLayer = require("../../middlewares/validatorLayer");

// exports.getCategoryValidator = [
//   check("id").isMongoId().withMessage("Invalid Id"),
//   validatorLayer,
// ];

exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("SubCategory name is required")
    .isLength({
      min: 2,
      max: 32,
    })
    .withMessage("SubCategory name must be 3 to 32 character"),
  check("category")
    .notEmpty()
    .withMessage("Category name is required")
    .isMongoId()
    .withMessage("Invalid category id"),
  validatorLayer,
];

// exports.updateCategoryValidator = [
//   check("id").isMongoId().withMessage("Invalid Id"),
//   validatorLayer,
// ];

// exports.deleteCategoryValidator = [
//   check("id").isMongoId().withMessage("Invalid Id"),
//   validatorLayer,
// ];

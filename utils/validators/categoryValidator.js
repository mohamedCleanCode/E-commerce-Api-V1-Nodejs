const { check } = require("express-validator");
const slugify = require("slugify");
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
  check("name").custom((value, { req }) => {
    req.body.slug = slugify(value);
    return true;
  }),
  validatorLayer,
];

exports.updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Id"),
  check("name").custom((value, { req }) => {
    req.body.slug = slugify(value);
    return true;
  }),
  validatorLayer,
];

exports.deleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Id"),
  validatorLayer,
];

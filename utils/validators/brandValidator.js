const { check } = require("express-validator");
const slugify = require("slugify");
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
  check("name").custom((value, { req }) => {
    req.body.slug = slugify(value);
    return true;
  }),
  validatorLayer,
];

exports.updateBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Id"),
  check("name").custom((value, { req }) => {
    req.body.slug = slugify(value);
    return true;
  }),
  validatorLayer,
];

exports.deleteBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Id"),
  validatorLayer,
];

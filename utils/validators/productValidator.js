const { check } = require("express-validator");
const slugify = require("slugify");
const validatorLayer = require("../../middlewares/validatorLayer");
const CategoryModel = require("../../models/categoryModel");
const SubCategoryModel = require("../../models/subCategoryModel");

exports.getProductValidator = [
  check("id").isMongoId().withMessage("Invalid Id"),
  validatorLayer,
];

exports.createProductValidator = [
  check("title")
    .notEmpty()
    .withMessage("Product title is required")
    .isLength({
      min: 3,
      max: 200,
    })
    .withMessage("Product name must be 3 to 32 character"),
  check("title").custom((value, { req }) => {
    req.body.slug = slugify(value);
    return true;
  }),
  check("description")
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({
      min: 20,
    })
    .withMessage("Product description must be >= 20 character"),
  check("quantity")
    .notEmpty()
    .withMessage("Product quantity is required")
    .isLength({
      min: 1,
    })
    .withMessage("Product description must be >= 1"),
  check("slod")
    .optional()
    .isNumeric()
    .withMessage("Product slod quantity must be a number"),
  check("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isNumeric()
    .withMessage("Product price must be a number")
    .isLength({
      min: 1,
    })
    .withMessage("Product price must be >= 1"),
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("Product priceAfterDiscount must be a number")
    .toFloat()
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error("Price after discount must be lower than price");
      }
      return true;
    }),
  check("colors").optional().isArray().withMessage("Colors must be in array"),
  check("imageCover").notEmpty().withMessage("Product imageCover is required"),
  check("images").optional().isArray().withMessage("Images must be in array"),
  check("category")
    .notEmpty()
    .withMessage("Product category is required")
    .isMongoId()
    .withMessage("Invalid id for category")
    .custom(async (value) => {
      const category = await CategoryModel.findById(value);
      if (!category) {
        throw new Error(`No category for this id ${value}`);
      }
      return true;
    }),
  check("subCategories")
    .optional()
    .isMongoId()
    .withMessage("Invalid id for subCategory")
    .custom(async (value) => {
      const subCategories = await SubCategoryModel.find({
        _id: { $exists: true, $in: value },
      });
      if (!subCategories || subCategories.length !== value.length) {
        throw new Error("Invalid Subcategories ids");
      }
      return true;
    })
    .custom(async (value, { req }) => {
      const subCategories = await SubCategoryModel.find({
        category: req.body.category,
      });
      const subCategoriesIdsInDB = [];
      subCategories.forEach((subCategory) => {
        subCategoriesIdsInDB.push(subCategory._id.toString());
      });
      if (!value.every((v) => subCategoriesIdsInDB.includes(v))) {
        throw new Error("Subcategories not belong to category");
      }
      return true;
    }),
  check("brand").optional().isMongoId().withMessage("Invalid id for brand"),
  check("ratingsAverage")
    .optional()
    .isNumeric()
    .withMessage("ratingsAverage must be a number")
    .isLength({
      min: 1,
      max: 5,
    })
    .withMessage("ratingsAverage must be between 1.0 to 5.0"),
  check("ratingsQuantity")
    .optional()
    .isNumeric()
    .withMessage("ratingsQuantity must be a number"),
  validatorLayer,
];

exports.updateProductValidator = [
  check("id").isMongoId().withMessage("Invalid Id"),
  check("title").custom((value, { req }) => {
    req.body.slug = slugify(value);
    return true;
  }),
  validatorLayer,
];

exports.deleteProductValidator = [
  check("id").isMongoId().withMessage("Invalid Id"),
  validatorLayer,
];

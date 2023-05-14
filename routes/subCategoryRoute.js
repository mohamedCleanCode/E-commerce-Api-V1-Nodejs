const express = require("express");

const {
  createSubCategory,
  getSubCategory,
  getSubCategories,
  updateSubCategory,
  deleteSubCategory,
  setCategoryIdToBody,
  setFilterObj,
} = require("../services/subCategoryService");
const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require("../utils/validators/subCategoryValidator");

// mergeParams: Allow us to access parameters on other routes
// Ex: We need to access categoryId from categroy router
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(setCategoryIdToBody, createSubCategoryValidator, createSubCategory)
  .get(setFilterObj, getSubCategories);
router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategory)
  .put(updateSubCategoryValidator, updateSubCategory)
  .delete(deleteSubCategoryValidator, deleteSubCategory);

module.exports = router;

const express = require("express");

const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/validators/productValidator");

const {
  getProducts,
  getPrduct,
  createPrduct,
  updatePrduct,
  deletePrduct,
} = require("../services/productService");

const router = express.Router();

router.route("/").get(getProducts).post(createProductValidator, createPrduct);
router
  .route("/:id")
  .get(getProductValidator, getPrduct)
  .put(updateProductValidator, updatePrduct)
  .delete(deleteProductValidator, deletePrduct);

module.exports = router;

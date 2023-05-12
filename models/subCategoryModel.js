const mongoose = require("mongoose");

const subCategoerySchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Subcategory required"],
      unique: [true, "Subcategory must be unique"],
      minLength: [3, "To short Subcategory name"],
      maxLength: [32, "To long Subcategory name"],
    },
    slug: {
      type: String,
      lowerCase: true,
    },
    // Parent
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Subcategory must be belong to main category"],
    },
  },
  { timestamps: true }
);

const SubCategoryModel = mongoose.model("Subcategory", subCategoerySchema);

module.exports = SubCategoryModel;

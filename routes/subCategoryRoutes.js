const express = require("express");
const { addSubCategoryPage, addSubCategory, getAllSubCategoires,SubcategoryDelete ,editCategoryPage,updateCategory} = require("../controllers/subCategoryController");
const subCategoryRoutes = express.Router();

subCategoryRoutes.get("/add", addSubCategoryPage);
subCategoryRoutes.post("/addSubcategory", addSubCategory);
subCategoryRoutes.get("/viewSubCategory", getAllSubCategoires);
subCategoryRoutes.get('/delete/:id',SubcategoryDelete);
subCategoryRoutes.get("/editSubCategory/:id",editCategoryPage)
subCategoryRoutes.post("/updateCategory/:id",  updateCategory);

module.exports = subCategoryRoutes;
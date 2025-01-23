const express = require("express");
const Category = require("../models/categoryModel");
const categoryRoutes = express.Router();
const {addCategoryPage, addNewCategory,viewAllCategory,categoryDelete,editCategoryPage,updateCategory} = require("../controllers/categoryController");



categoryRoutes.get("/add", addCategoryPage);
categoryRoutes.post("/addCategory", Category.uploadImage, addNewCategory );
categoryRoutes.get("/viewCategory", viewAllCategory);
categoryRoutes.get('/delete/:id',categoryDelete);
categoryRoutes.get("/editCategory/:id",editCategoryPage)
categoryRoutes.post("/updateCategory/:id", Category.uploadImage, updateCategory);

module.exports = categoryRoutes;
const express=require("express");
const Books =require("../models/bookStoreModel");
const {addBookPage,addNewBook,viewAllBook,bookDelete,getAllCategories,editBookPage,updateBook} = require("../controllers/bookController");
const BookRoutes=express.Router();

BookRoutes.get("/addBook", addBookPage);
BookRoutes.post("/add-Book", Books.uploadImageBook, addNewBook);
BookRoutes.get("/viewAllBook", viewAllBook);
BookRoutes.get("/Delete/:id", bookDelete);
BookRoutes.get("/editBook/:id",editBookPage)
BookRoutes.post("/editBook/:id",Books.uploadImageBook,updateBook);
BookRoutes.get("/getAllcategoies", getAllCategories);


module.exports = BookRoutes;
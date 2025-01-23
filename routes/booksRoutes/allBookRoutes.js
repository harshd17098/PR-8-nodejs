const express = require('express');
const bookRoutes = express.Router();
const {allBooks,singleBook} = require('../../controllers/allBookController');

bookRoutes.get("/",allBooks);
bookRoutes.get("/singleBook/:id",singleBook)

module.exports= bookRoutes;
const mongoose = require('mongoose');
const multer = require('multer');
const { type } = require('os');
const path = require('path');


const bookSchema = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    subcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory"
    },
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
    },
    authorEmail:{
        type:String,
    },
    price: {
        type: Number,
        required: true,
    },
    publishedName:{
        type:String
    },
    publishedDate: {
        type: Date,
        required: true
    },
    stock: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    bookPages:{
        type: Number,
        required: true
    },
    publishedTime:{
        type: String,
        required: true
    },
    bookImg:{
        type: String,
        required: true
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "uploads/book"));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname+"-"+Date.now());
    }
});



bookSchema.statics.uploadImageBook = multer({storage: storage}).single('bookImg');

const Books = mongoose.model("Books", bookSchema);

module.exports = Books;
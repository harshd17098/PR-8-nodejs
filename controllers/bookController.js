const Category = require('../models/categoryModel');
const SubCategory = require("../models/subCategoryModel");
const path = require('path');
const fs = require('fs');
const Books = require('../models/bookStoreModel');



exports.addBookPage = async (req, res) => {
    try {
        const categories = await Category.find()
        return res.render('books/addBook', { categories })
    } catch (error) {
        console.log(error);
        res.redirect("back")

    }

};

exports.addNewBook = async (req, res) => {

    try {
        let imagePath = "";
        if (req.file) {
            imagePath = `/uploads/Book/${req.file.filename}`
        }
        req.body.bookImg = imagePath;
        let fullName = req.user.firstname + " " + req.user.lastname
        req.body.author = fullName
        req.body.authorEmail = req.user.email

        let newBook = await Books.create(req.body);
        if (newBook) {
            console.log("New Book Added...");
            return res.redirect("back")
        } else {
            console.log("Somthing Wrong...");
            return res.redirect("back")
        }

    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
};
exports.getAllCategories = async (req, res) => {
    try {
        const categoryId = req.query.categoryId;
        const subCategories = await SubCategory.find({ categoryId: categoryId });

        return res.json({ subCategories });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.viewAllBook = async (req, res) => {
    try {
       

        let book = await Books.find({}).populate('categoryId').populate('subcategoryId');
        let loginuser= res.locals.admin
        console.log("Book", book);

        return res.render('books/viewAllBook', { book, loginuser });
    } catch (error) {
        console.log(error);
        return res.redirect("back")

    }
};

exports.bookDelete = async (req, res) => {

    try {
        let rec = await Books.findById(req.params.id);
        if (rec) {
            if (rec.bookImg) {
                let imagepath = path.join(__dirname, "..", rec.bookImg);
                await fs.unlinkSync(imagepath);
                await Books.findByIdAndDelete(req.params.id);
                return res.redirect('back');
            } else {
                await Books.findByIdAndDelete(req.params.id);
                console.log("Delete Success");
                return res.redirect('back');
            }
        }

    } catch (error) {
        console.log('Somthing Wrong');
        return res.redirect('back');
    }
};
exports.editBookPage = async (req, res) => {
    try {
        let book = await Books.findById(req.params.id);
        console.log(book);

        let categories = await Category.find();
        let subcategories = await SubCategory.find({ categoryId: book.categoryId });

        if (book || categories || subcategories) {
            return res.render('books/bookEdit', {
                book,
                categories,
                subcategories,
            });
        } else {
            return res.redirect('back');
        }
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
};
exports.updateBook = async (req, res) => {

    try {
        let record = await Books.findById(req.params.id);
        if (record) {
            if (req.file) {
                let imagePath = record.bookImg;
                if (imagePath != "") {
                    imagePath = path.join(__dirname, "..", imagePath);
                    try {
                        await fs.unlinkSync(imagePath);
                    } catch (error) {
                        console.log("File Missing....");
                    }
                }
                let newImagepath = `/uploads/book/${req.file.filename}`;
                req.body.bookImg = newImagepath
            } else {
                req.body.bookImg = record.bookImg
            }
            await Books.findByIdAndUpdate(req.params.id, req.body, { new: true });
            console.log("Update Record Success...");
            return res.redirect("/Admin/book/viewAllBook")
        } else {
            console.log("Record not Found...")
            return res.redirect('back');
        }
    } catch (error) {
        console.log(err);
        return res.redirect('back');
    }
};


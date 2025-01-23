const Category = require('../models/categoryModel');
const path = require('path');
const fs = require('fs');

exports.addCategoryPage = (req, res) => {
    try {
        return res.render("category/addCategory");
    } catch (error) {
        console.log(error);
        return res.redirect("back");
    }
};

exports.addNewCategory = async(req, res) => {
    try {
        let imagePath = "";
        if(req.file){
            imagePath = `/uploads/categories/${req.file.filename}`
        }
        req.body.categoryImage = imagePath;

        let newCategory = await Category.create(req.body);
        if(newCategory){
            return res.redirect("back");
        }else{
            return res.redirect("back");
        }
    } catch (error) {
        console.log(error);
        return res.redirect("back");
    }
};

exports.viewAllCategory = async (req, res) => {
    
    let category = await Category.find(); 
    return res.render('category/viewCategory', { category});


};
exports.categoryDelete = async (req, res) => {
   
    try {
        let rec = await Category.findById(req.params.id);        
        if (rec) {
            if (rec.categoryImage) {
                let imagepath = path.join(__dirname, "..", rec.categoryImage);
                await fs.unlinkSync(imagepath);
                await Category.findByIdAndDelete(req.params.id);
                return res.redirect('back');
            } else {
                await Category.findByIdAndDelete(req.params.id);
                console.log("Delete Success");
                return res.redirect('back');
            }
        }

    } catch (error) {
        console.log('Somthing Wrong');
        return res.redirect('back');
    }

};
exports.editCategoryPage = async (req, res) => {
 
    try {
        let record = await Category.findById(req.params.id);
        if (record) {
            return res.render('category/categoryEdit', { editCategory: record });
        } else {
            return res.redirect('back');
        }
    } catch (error) {
        console.log(err);
        return res.redirect('back');
    }

};



exports.updateCategory = async (req, res) => {

    try {
        let record = await Category.findById(req.params.id);
        if (record) {
            if (req.file) {
                let imagePath = record.categoryImage;
                if (imagePath != "") {
                    imagePath = path.join(__dirname, "..", imagePath);
                    try {
                        await fs.unlinkSync(imagePath);
                    } catch (error) {
                        console.log("File Missing....");
                    }
                }
                let newImagepath = `/uploads/categories/${req.file.filename}`;
                req.body.categoryImage = newImagepath
            } else {
                req.body.categoryImage = record.categoryImage
            }
            await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
            console.log("Update Record Success...");
            return res.redirect("/Admin/category/viewCategory")
        } else {
            console.log("Record not Found...")
            return res.redirect('back');
        }
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }

};
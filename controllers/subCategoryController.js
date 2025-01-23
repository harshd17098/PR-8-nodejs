const Category = require('../models/categoryModel');
const SubCategory = require("../models/subCategoryModel");


exports.addSubCategoryPage = async (req, res) => {
    try {
        let categories = await Category.find();
        return res.render('subcategory/addSubcategory', { categories });
    } catch (error) {
        console.log(error);
        return res.redirect("back");
    }
}


exports.addSubCategory = async (req, res) => {
    try {
        let newSubCategory = await SubCategory.create(req.body);
        if (newSubCategory) {
            return res.redirect("back");
        } else {
            return res.redirect("back");
        }
    } catch (error) {
        console.log(error);
        return res.redirect("back");
    }
};


exports.getAllSubCategoires = async (req, res) => {
    try {
        let subCategories = await SubCategory.find().populate('categoryId');
        console.log(subCategories);

        return res.render("subcategory/viewSubCategory", { subCategories });
    } catch (error) {
        console.log(error);
        return res.redirect("back");
    }
};

exports.SubcategoryDelete = async (req, res) => {

    try {
        let rec = await SubCategory.findById(req.params.id);
        if (rec) {
            await SubCategory.findByIdAndDelete(req.params.id);
            console.log("Delete Success");
            return res.redirect('back');
        }else{
            console.log("Delete Failed");
            return res.redirect('back');
        }
    } catch (error) {
        console.log('Somthing Wrong');
        return res.redirect('back');
    }

};

exports.editCategoryPage = async (req, res) => {
 
    try {
        let record = await SubCategory.findById(req.params.id);
        let categories=await Category.find();
        if (record|| categories) {
            return res.render('subcategory/subCategoryEdit', { editSubCategory: record,categories });
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
        let record = await SubCategory.findById(req.params.id);
        if (record) {
            await SubCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
            console.log("Update Record Success...");
            return res.redirect("/Admin/subcategory/viewSubCategory")
        } else {
            console.log("Record not Found...")
            return res.redirect('back');
        }
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }

};



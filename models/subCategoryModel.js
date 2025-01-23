const mongoose = require("mongoose");

const subCategorySchema = mongoose.Schema({
    categoryId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    subCategory: {
        type: String
    }
});

const SubCategory = mongoose.model('SubCategory', subCategorySchema);

module.exports = SubCategory;
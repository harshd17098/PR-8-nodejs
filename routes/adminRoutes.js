const express=require("express")
const Admin =require("../models/adminModel")
const adminRoutes=express.Router()

const { addAdminPage, viewAllAdmins, addNewAdmin, adminDelete, editAdminPage, updateAdmin } = require('../controllers/adminController');


adminRoutes.get("/add", addAdminPage)
adminRoutes.get("/viewalladmin", viewAllAdmins);
adminRoutes.post("/addAdmin", Admin.uploadImage, addNewAdmin);
adminRoutes.get('/delete/:id',adminDelete);
adminRoutes.get("/editAdmin/:id",editAdminPage)
adminRoutes.post("/updateAdmin/:id", Admin.uploadImage, updateAdmin);


module.exports=adminRoutes;
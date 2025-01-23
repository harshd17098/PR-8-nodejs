const express=require("express")
const { loginPage, dashBoard, checkedLogin, logout } = require("../controllers/authController");
const authroutes=express.Router();
const passport = require('passport');



authroutes.get("/",loginPage);
authroutes.get("/dashboard",passport.validateUser,dashBoard);
authroutes.post("/checkedLogin", passport.authenticate('local', {failureRedirect: "/"}),checkedLogin);
authroutes.get("/logout", logout);



authroutes.use("/admin",passport.validateUser,require("./adminRoutes"));
authroutes.use("/book", passport.validateUser, require('./adminBookRoutes'));
authroutes.use("/category",passport.validateUser, require('./categoryroutes'));
authroutes.use("/subcategory",passport.validateUser, require('./subCategoryRoutes'));

module.exports=authroutes;
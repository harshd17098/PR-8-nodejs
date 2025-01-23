const Admin = require('../models/adminModel');
const path = require('path');
const fs = require('fs');


exports.logout = (req, res) => {

    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        }
        return res.redirect("/");
    })
};


exports.checkedLogin = async (req, res) => {
    try {
        req.flash('success', 'Login Success...')
        return res.redirect("dashboard")
    } catch (error) {
        console.log(error);
        return res.redirect("/")
    }
};
exports.dashBoard = async (req, res) => {
    try {
        return res.render("dashboard");

    } catch (error) {
        console.log(error);
        return res.redirect("/")
    }
}
exports.loginPage = (req, res) => {
    return res.render("adminSingIn");
};
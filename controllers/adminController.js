const Admin = require('../models/adminModel');
const path = require('path');
const fs = require('fs');

exports.addAdminPage = async (req, res) => {

        return res.render('admins/addAdmin');
  

};

exports.viewAllAdmins = async (req, res) => {
    try {
      
        let admins = await Admin.find();
        return res.render('admins/viewAdmin', { admins});
    } catch (error) {
        console.log(error);
        return res.render("back")
        
    }
};


exports.addNewAdmin = async (req, res) => {
 
        try {
            let imagePath = "";
            if (req.file) {
                imagePath = `/uploads/Admins/${req.file.filename}`
            }
            req.body.adminImg = imagePath;
            console.log(req.body);


            let newAdmin = await Admin.create(req.body);
            console.log(newAdmin);
            
            if (newAdmin) {
                console.log("New Admin Added...");
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
exports.adminDelete = async (req, res) => {
   
        try {
            let rec = await Admin.findById(req.params.id);
            if (rec) {
                if (rec.adminImg) {
                    let imagepath = path.join(__dirname, "..", rec.adminImg);
                    await fs.unlinkSync(imagepath);
                    await Admin.findByIdAndDelete(req.params.id);
                    return res.redirect('back');
                } else {
                    await Admin.findByIdAndDelete(req.params.id);
                    console.log("Delete Success");
                    return res.redirect('back');
                }
            }

        } catch (error) {
            console.log('Somthing Wrong');
            return res.redirect('back');
        }

    
};
exports.editAdminPage = async (req, res) => {
 
        try {
            let record = await Admin.findById(req.params.id);
            if (record) {
                return res.render('admins/adminEdit', { editAdmin: record });
            } else {
                return res.redirect('back');
            }
        } catch (error) {
            console.log(err);
            return res.redirect('back');
        }
   
};



exports.updateAdmin = async (req, res) => {
  
        try {
            let record = await Admin.findById(req.params.id);
            if (record) {
                if (req.file) {
                    let imagePath = record.adminImg;
                    if (imagePath != "") {
                        imagePath = path.join(__dirname, "..", imagePath);
                        try {
                            await fs.unlinkSync(imagePath);
                        } catch (error) {
                            console.log("File Missing....");
                        }
                    }
                    let newImagepath = `/uploads/admins/${req.file.filename}`;
                    req.body.adminImg = newImagepath
                } else {
                    req.body.adminImg = record.adminImg
                }
                await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
                console.log("Update Record Success...");
                return res.redirect("/Admin/admin/viewalladmin")
            } else {
                console.log("Record not Found...")
                return res.redirect('back');
            }
        } catch (error) {
            console.log(err);
            return res.redirect('back');
        }
   
};


const usersModel = require('../models/users.model');
const bcrypt = require("bcrypt");
exports.getAllUsers = async (req, res) => {
    if (req.session.user.quyen !== 'Admin') {
        res.redirect('/news');
    }{
        const user = await usersModel.find({});
        res.render('./user/user', {users: user});
    }
}
exports.postAddUser = async (req, res) => {
    const user = await usersModel.find({});
    const us = usersModel.find({Email: req.body.Email});
    if (us.length > 0) {
        return res.render('./user/user', {users: user, msg: 'Email đã tồn tại'});
    }
    else {
        console.log(req.body.flexRadioDefault1);
        let role = (req.body.flexRadioDefault1 === "Admin") ? "Admin" : "User";
        const salt = await bcrypt.genSalt(10);
        const objUser = new usersModel({
            FullName: req.body.FullName,
            Email: req.body.Email,
            Password: await bcrypt.hash(req.body.Password, salt),
            quyen: role
        })
        await objUser.save( function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(objUser);
            }
        });
        res.redirect('/users');
    }
}
exports.postEditUser = async (req, res) => {
    let dieuKien = {_id: req.params.id};
    const salt = await bcrypt.genSalt(10);
    console.log(salt)
    let duLieu= {
        FullName: req.body.UpInputFullName,
        Email: req.body.UpInputEmail,
        Password: await bcrypt.hash(req.body.UpInputPassword,salt),
        quyen: 'user'
    };
    usersModel.updateOne(dieuKien, duLieu, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Success");
        }
    });
    res.redirect('/users');
}
exports.postEditUserID = async (req, res) => {
    let dieuKien = {_id: req.body.UpInputID};
    const salt = await bcrypt.genSalt(10);
    console.log(salt)
    let duLieu= {
        FullName: req.body.UpInputFullName,
        Email: req.body.UpInputEmail,
        Password: await bcrypt.hash(req.body.UpInputPassword,salt),
        quyen:  req.body.UpInputRole
    };
    usersModel.updateOne(dieuKien, duLieu, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Success");
        }
    });
    res.redirect('/users');
}
exports.deleteUser = async (req, res) => {
    await usersModel.findByIdAndDelete(req.params.id);
    res.redirect('/users');
}
exports.deleteUserID = async (req, res) => {
    await usersModel.findByIdAndDelete(req.body.DpInputID);
    res.redirect('/users');
}
exports.getUserById = async (req, res) => {
    await usersModel.findById(req.params.id);
    res.redirect('/users');
}

const userModel = require('../models/users.model');
const bcrypt = require("bcrypt");

exports.signIn = (req, res) => {
    if (req.session.user) {
        res.redirect('/news');
    }
    res.render('./login/signIn');
}
exports.signUp = (req, res) => {
    res.render('./login/signUp');
}
exports.signInPost = async (req, res) => {
    const user = await userModel.find({Email: req.body.Email});
    console.log(user.length);
    if (user.length > 0) {
        const validPassword = await bcrypt.compare(req.body.Password, user[0].Password);
        if (validPassword) {
            req.session.user = user[0];
            res.redirect('/news');
        } else {
            res.render('./login/signIn', {error: '<p class="text-danger">Sai mật khẩu </p>'});
        }
    } else {
        res.render('./login/signIn', {error: '<p class="text-danger">Tài khoản không tồn tại</p>'});
    }
}
exports.signUpPost = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const objUser = new userModel({
        FullName: req.body.firstName + " " + req.body.lastName,
        Email: req.body.Email,
        Password: await bcrypt.hash(req.body.Password, salt),
    })
    await objUser.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log(objUser);
        }
    });
    res.send(objUser)
}

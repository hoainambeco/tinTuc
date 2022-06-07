const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://hoainambeco:01684490544Fe@cluster0.f6gva.mongodb.net/TinTuc').then(function () {
    console.log('Connected to MongoDB');
}).catch(e => {
    console.log('Error: ', e);
});
const jwt = require('jsonwebtoken');
require('dotenv').config();
const chuoi_ky_tu_bi_mat = process.env.TOKEN_SEC_KEY;
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
    FullName: String,
    Email: String,
    Password: String,
    quyen: String,
});
userSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({UserName: username});
    if (!user) {
        throw new Error({error: 'Unable to login'});
    }
    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
        throw new Error({error: 'Unable to login'});
    }
    return user;
};
const Users = mongoose.model('Users', userSchema);
module.exports = Users;

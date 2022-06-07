var express = require('express');
var router = express.Router();
var userController = require('../controllers/users.controllers');
/* GET users listing. */
router.get('/', userController.getAllUsers);
router.post('/add', userController.postAddUser);
router.get('/id/:id', userController.getUserById);
router.post('/edit/:id', userController.postEditUser);
router.post('/edit', userController.postEditUserID);
router.post('/delete/:id', userController.deleteUser);
router.post('/delete/', userController.deleteUserID);

module.exports = router;

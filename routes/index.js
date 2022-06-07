var express = require('express');
var router = express.Router();
var loginController = require('../controllers/login.controllers');

/* GET news page. */
router.get('/', loginController.signIn);
router.post('/', loginController.signInPost);
router.get('/signUp', loginController.signUp);
router.post('/signUp', loginController.signUpPost);

module.exports = router;

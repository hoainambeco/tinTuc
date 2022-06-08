var express = require('express');
var router = express.Router();
var newsController = require('../controllers/newsAPI.controller');

/* GET news page. */
router.get('/', newsController.getAllNews);
router.post('/', newsController.postAddNews);
router.get('/id/:id', newsController.getNewsById);
router.post('/edit/:id', newsController.postEditNews);
router.post('/delete/:id', newsController.deleteNews);
router.get('/delete/:id', newsController.deleteNews);
router.post('/addComment', newsController.postComment);
router.get('/deleteComment/:idComment', newsController.postDeleteComment);
router.post('/deleteComment/:idComment', newsController.postDeleteComment);


module.exports = router;

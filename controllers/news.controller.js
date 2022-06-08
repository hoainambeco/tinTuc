const newsModel = require('../models/news.model');
const commentModel = require('../models/comment.model');

const DeleteComment = 'You can not delete this comment';
exports.getAllNews = async (req, res) => {
    const news = await newsModel.find({});
    res.render('./news/news', {news: news});
}
exports.postAddNews = async (req, res) => {
    const objNews = new newsModel({
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
    });
    await objNews.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log(objNews);
        }
    });
    res.redirect('/news');
}

let newId;
let comments;
exports.getNewsById = async (req, res) => {
    console.log('teaat' + req.session);
    newId = await newsModel.findById(req.params.id);
    comments = await commentModel.find({idNews: req.params.id});
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render('./news/postNews', {news: newId, comments: comments, user: req.session.user});
}
exports.postEditNews = async (req, res) => {
    await newsModel.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/news');
}
exports.deleteNews = async (req, res) => {
    await newsModel.findByIdAndDelete(req.params.id);
    res.redirect('/news');
}
exports.postComment = async (req, res) => {
    if (req.session.user) {
        const comment = new commentModel({
            idNews: req.body.idNews,
            fullNameUser: req.body.fullNameUser,
            Email: req.body.Email,
            content: req.body.content,
            date: new Date(Date.now())
        });
        await comment.save(function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log(comment);
            }
        });
        res.redirect('/news/id/' + req.body.idNews);
    } else
        res.redirect('/login');
}
exports.postDeleteComment = async (req, res) => {
    const comment = await commentModel.findById(req.body.deleteIdComment);
    console.log(comment);
    if (comment.Email === req.session.user.Email || req.session.user.quyen === 'Admin') {
        await commentModel.findByIdAndDelete(req.body.deleteIdComment);
        comments = await commentModel.find({idNews: comment.idNews});
        res.render('./news/postNews', {news: newId, comments: comments, user: req.session.user});
    }
    else {
        res.render('./news/postNews', {news: newId, comments: comments, user: req.session.user, DeleteComment: DeleteComment});
    }
}

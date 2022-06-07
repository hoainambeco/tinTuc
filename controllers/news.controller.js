const newsModel = require('../models/news.model');
const commentModel = require('../models/comment.model');
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
exports.getNewsById = async (req, res) => {
    console.log('teaat' + req.session);
    const news = await newsModel.findById(req.params.id);
    const comments = await commentModel.find({idNews: req.params.id});
    if (!req.session.user) {
        return res.redirect('/login');
    }
    let comment = []
    await comments.forEach(function (item) {
        if (item.Email === req.session.user.Email) {
            comment.push({
                _id: item._id,
                idNews: item.idNews,
                fullNameUser: 'Bạn',
                Email: item.Email,
                content: item.content,
                date: item.date,
                modelDeleteComment: true,
            })
        } else if (req.session.user.quyen === 'Admin') {
            comment.push({
                _id: item._id,
                idNews: item.idNews,
                fullNameUser: item.fullNameUser,
                Email: item.Email,
                content: item.content,
                date: item.date,
                modelDeleteComment: true,
            })
        } else {
            comment.push({
                _id: item._id,
                idNews: item.idNews,
                fullNameUser: item.fullNameUser,
                Email: item.Email,
                content: item.content,
                date: item.date,
            })
        }
    });
    res.render('./news/postNews', {news: news, comments: comment, user: req.session.user});
}
exports.postEditNews = async (req, res) => {
    const news = await newsModel.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/news');
}
exports.deleteNews = async (req, res) => {
    const news = await newsModel.findByIdAndDelete(req.params.id);
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
    const comment = await commentModel.findByIdAndDelete(req.body.deleteIdComment);
    console.log(comment);
    res.redirect('/news/id/' + comment.idNews);
}

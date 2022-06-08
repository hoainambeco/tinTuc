const newsModel = require('../models/news.model');
const commentModel = require('../models/comment.model');

exports.getAllNews = async (req, res) => {
    const news = await newsModel.find({});
    res.json({news: news});
}
exports.postAddNews = async (req, res) => {
    const objNews = new newsModel({
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
    });
    await objNews.save(function (err) {
        if (err) {
            return res.json({error: err});
        } else {
            res.json({news: objNews});
        }
    });
}
exports.getNewsById = async (req, res) => {
    if (!req.session.user) {
        return res.json({error: 'Bạn phải đăng nhập để xem bài viết'});
    }
    const news = await newsModel.findById(req.params.id);
    const comments = await commentModel.find({idNews: req.params.id});
    res.json({news: news, comments: comments});
}
exports.postEditNews = async (req, res) => {
    if (!req.session.user) {
        return res.json({error: 'Bạn phải đăng nhập để xem bài viết'});
    }
    if (req.session.user.quyen === 'Admin') {
        await newsModel.findByIdAndUpdate(req.params.id, req.body);
        res.json({id: req.params.id,news: req.body});
    }
    else {
        return res.json({error: 'Bạn không có quyền sửa bài viết này'});
    }
}
exports.deleteNews = async (req, res) => {
    if (!req.session.user) {
        return res.json({error: 'Bạn phải đăng nhập để xóa bài viết'});
    }
    if (req.session.user.quyen === 'Admin') {
        await newsModel.findByIdAndDelete(req.params.id);
        res.json({news: req.params.id});
    }
    else {
        return res.json({error: 'Bạn không có quyền xóa bài viết này'});
    }
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
                return res.json({error: err});
            } else {
                res.json({comment: comment});
            }
        });
    }
    else {
        return res.json({error: 'Bạn phải đăng nhập để bình luận'});
    }
}
exports.postDeleteComment = async (req, res) => {
    const comment = await commentModel.findById(req.params.idComment);
    if (comment.Email === req.session.user.Email || req.session.user.role === 'Admin') {
        await commentModel.findByIdAndDelete(req.params.id);
        res.json({comment: req.params.id});
    }
    else {
        return res.json({error: 'Bạn không có quyền xóa bình luận này', comment:comment});
    }
}

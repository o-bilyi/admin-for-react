const express = require('express');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

const router = express.Router();
const db     = require('./dataBase');

router.route('/users').get(function (req, res) {
    res.send(db.getUsers());
});

router.route('/posts').get(function (req, res) {
    res.send(db.getPosts());
});

router.route('/projects').get(function (req, res) {
    res.send(db.getProject());
});

router.post('/add-users', function(req, res) {
 db.setUsers(req.body).then(() => res.redirect("/users"))
});

router.post('/add-projects', multipartMiddleware, function(req, res) {
  if(req.files) {
    console.log(req.files.projectImg);
    db.setProject(req.body).then(() => res.redirect("/projects"))
  }else {
    return false
  }
});

router.post('/add-post', function(req, res) {
  db.setPosts(req.body).then(() => res.redirect("/blog"))
});

module.exports = router;

const express = require('express');

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

router.post('/projects', function(req, res) {
  db.setProject(req.body).then(() => res.redirect("/projects"))
});

router.post('/add-post', function(req, res) {
  db.setPosts(req.body).then(() => res.redirect("/blog"))
});

module.exports = router;

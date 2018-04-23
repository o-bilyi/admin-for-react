const express = require('express');
const router  = express.Router();
const db      = require('./dataBase');

router.route('/').get(function (req, res) {
  res.render('index');
});

router.route('/projects').get(function (req, res) {
  res.render('projects', {projects: db.allData.projects});
});

router.route('/blog').get(function (req, res) {
  res.render('blog', {posts: db.allData.posts});
});

router.route('/users').get(function (req, res) {
  res.render('users', {users: db.allData.users});
});

module.exports = router;

const express  = require('express');
const router   = express.Router();
const db       = require('./dataBase');
const uploader = require('./file-uploader');

router.route('/users').get(function (req, res) {
    res.send(db.allData.users);
});

router.route('/posts').get(function (req, res) {
    res.send(db.allData.posts);
});

router.route('/projects').get(function (req, res) {
    res.send(db.allData.projects);
});

router.post('/add-users', function(req, res) {
  uploader(req).then(result => {
    db.setUsers(result);
    res.redirect('/users');
  }).catch(e => {
    console.warn(e);
    res.redirect('/users', {errors: 'some error'});
  });
});

router.post('/add-projects', function(req, res) {
  uploader(req).then(result => {
    db.setProject(result);
    res.redirect('/projects');
  }).catch(e => {
    console.warn(e);
    res.redirect('/projects', {errors: 'some error'});
  });
});

router.post('/add-post', function(req, res) {
  uploader(req).then(result => {
    db.setPosts(result);
    res.redirect('/blog');
  }).catch(e => {
    console.warn(e);
    res.redirect('/blog', {errors: 'some error'});
  });
});

module.exports = router;

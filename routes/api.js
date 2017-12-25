const express = require('express');
const jsonfile = require('jsonfile');
const router = express.Router();
const usersFile = 'views/users/users.json';
const postsFile = 'views/blog/posts.json';
const projectsFile = 'views/projects/projects.json';

let users = jsonfile.readFileSync(usersFile);
let posts = jsonfile.readFileSync(postsFile);
let projects = jsonfile.readFileSync(projectsFile);

/* GET home page. */
router.route('/users').get(function (req, res) {
    res.send(users);
});
router.route('/posts').get(function (req, res) {
    res.send(posts);
});
router.route('/projects').get(function (req, res) {
    res.send(projects);
});

module.exports = router;

const
    express = require('express'),
    router = express.Router(),
    jsonFile = require('jsonfile');

const usersFile = 'views/users/users.json';
const postsFile = 'views/blog/posts.json';
const projectsFile = 'views/projects/projects.json';

let users = jsonFile.readFileSync(usersFile);
let posts = jsonFile.readFileSync(postsFile);
let projects = jsonFile.readFileSync(projectsFile);

/* GET home page. */
router.route('/').get(function (req, res) {
    res.render('index', {users: users});
});

router.route('/projects').get(function (req, res) {
    res.render('projects', {users: users});
});

router.route('/blog').get(function (req, res) {
    res.render('blog', {posts: posts});
});

router.route('/users').get(function (req, res) {
    res.render('users', {users: users});
});

router.post('/add-users', function (req, res) {
    users.push(req.body);

    jsonFile.writeFile(usersFile, users, {spaces: 2}, function (err) {
        console.error(err);
        res.redirect('/');
    })

});
router.post('/projects', function (req, res) {
    projects.push(req.body);

    jsonFile.writeFile(projectsFile, projects, {spaces: 2}, function (err) {
        console.error(err);
        res.redirect('/');
    })

});
router.post('/add-post', function (req, res) {
    posts.push(req.body);

    jsonFile.writeFile(postsFile, posts, {spaces: 2}, function (err) {
        console.error(err);
        res.redirect('/');
    })

});

module.exports = router;

const router = require("express").Router();
const db = require("./util/data-base");

router.route("/").get((req, res) => {
    res.render("index");
});

router.route("/projects").get((req, res) => {
    res.render("projects", {projects: db.allData.projects});
});

router.route("/blog").get((req, res) => {
    res.render("blog", {posts: db.allData.posts});
});

router.route("/users").get((req, res) => {
    res.render("users", {users: db.allData.users});
});

router.route("/contacts").get((req, res) => {
    res.render("contacts", {contacts: db.allData.contacts});
});

module.exports = router;

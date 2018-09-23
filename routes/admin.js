const router = require("express").Router();
const db = require("./util/data-base");

router.route("/").get((req, res) => {
    res.render("index");
});

router.route("/projects").get((req, res) => {
    res.render("projects", {projects: db.allData.projects});
});
router.route("/projects-text").get((req, res) => {
    res.render("projectsText", {projectsText: db.allData.projectsText});
});

router.route("/users").get((req, res) => {
    res.render("users", {users: db.allData.users});
});
router.route("/users-text").get((req, res) => {
    res.render("usersText", {usersText: db.allData.usersText});
});

router.route("/contacts").get((req, res) => {
    res.render("contacts", {contacts: db.allData.contacts});
});
router.route("/contacts-text").get((req, res) => {
    res.render("contactsText", {contactsText: db.allData.contactsText});
});

router.route("/blog").get((req, res) => {
    res.render("blog", {posts: db.allData.posts});
});

module.exports = router;

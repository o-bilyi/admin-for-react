const express = require("express");
const router  = express.Router();
const db      = require("./util/data-base");

router.route("/admin").get((req, res) => {
  res.render("users", {users: db.allData.users});
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

module.exports = router;

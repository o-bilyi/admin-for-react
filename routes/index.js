const express = require("express");
const router  = express.Router();
const db      = require("./util/data-base");

// router.route("*").get((req, res) => {
// 	res.send("index");
// });

router.route("/admin").get((req, res) => {
  res.render("index");
});

router.route("/admin/projects").get((req, res) => {
  res.render("projects", {projects: db.allData.projects});
});

router.route("/admin/blog").get((req, res) => {
  res.render("blog", {posts: db.allData.posts});
});

router.route("/admin/users").get((req, res) => {
  res.render("users", {users: db.allData.users});
});

module.exports = router;

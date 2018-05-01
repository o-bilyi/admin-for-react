const express = require("express");
const router = express.Router();
const db = require("./dataBase");
const uploader = require("./file-uploader");

router.route("/users")
    .get(function (req, res) {
        res.send(db.allData.users);
    })
    .post((req, res) => {
        uploader(req).then(result => {
            db.setUsers(result);
            res.redirect("/users");
        }).catch(e => {
            console.warn(e);
            res.redirect("/users", {errors: "some error"});
        });
    })
    .delete((req, res) => {
        console.warn(req.body, "users");
        db.changeUsers(req.body)
            .then(() => res.send("ok"));
    });

router.route("/projects")
    .get((req, res) => {
        res.send(db.allData.projects);
    })
    .post((req, res) => {
        uploader(req).then(result => {
            db.setProject(result);
            res.redirect("/projects");
        }).catch(e => {
            console.warn(e);
            res.redirect("/projects", {errors: "some error"});
        });
    })
    .delete((req, res) => {
        console.warn(req.body, "projects")
        db.changeProjects(req.body)
            .then(() => res.send("ok"));
    });

router.route("/posts")
    .get((req, res) => {
        res.send(db.allData.posts);
    })
    .post((req, res) => {
        uploader(req).then(result => {
            db.setPosts(result);
            res.redirect("/blog");
        }).catch(e => {
            console.warn(e);
            res.redirect("/blog", {errors: "some error"});
        });
    })
    .delete((req, res) => {
        console.warn(req.body, "posts")
        db.changePosts(req.body)
            .then(() => res.send("ok"));
    });

module.exports = router;

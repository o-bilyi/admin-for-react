const express = require("express");
const router = express.Router();
const db = require("./util/data-base");
const uploader = require("./util/file-uploader");
const deleteImages = require("./util/delete-item");

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
    .delete((request, response) => {
        const delatetElem = db.allData.users.find(i => i.id = request.body);
        deleteImages(delatetElem.img, delatetElem["preview-img"]).then(() => {
            db.removeUser(request.body).then(() => response.send("ok"));
        });
    })

router.route("/projects")
    .get((req, res) => {
        res.send(db.allData.projects);
        console.warn(res.headers);
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
    .delete((request, response) => {
        const delatetElem = db.allData.projects.find(i => i.id = request.body);
        deleteImages(delatetElem.img, delatetElem.previewImg).then(() => {
            db.removeProject(request.body).then(() => response.send('ok'));
        });
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
    .delete((request, response) => {
        const delatetElem = db.allData.posts.find(i => i.id = request.body);
        deleteImages(delatetElem.img, delatetElem["preview-img"]).then(() => {
            db.removePost(request.body).then(() => response.send("ok"));
        });
    });

module.exports = router;

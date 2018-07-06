const router = require("express").Router();
const db = require("./util/data-base");
const uploader = require("./util/file-uploader");
const deleteImages = require("./util/delete-image");

router.route("/users")
    .get(function (req, res) {
        res.send(db.allData.users);
    })
    .post((req, res) => {
        uploader(req).then(result => {
            db.setUsers(result);
            res.redirect("/admin/users");
        }).catch(e => {
            console.warn(e);
            res.redirect("/admin/users", {errors: "some error"});
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
    })
    .post((req, res) => {
        uploader(req).then(result => {
            db.setProject(result);
            res.redirect("/admin/projects");
        }).catch(e => {
            console.warn(e);
            res.redirect("/admin/projects", {errors: "some error"});
        });
    })
    .delete((request, response) => {
        const id = request.body.id;
        const delatetElem = db.allData.projects.find(i => i.id = id);
        console.warn(delatetElem);
        deleteImages(delatetElem.img, delatetElem.previewImg).then(() => {
            // db.removeProject(request.headers.id).then(() =>  console.warn('ok'));
            db.removeProject(id).then(() =>  response.send('ok'));
        });
    });

router.route("/posts")
    .get((req, res) => {
        res.send(db.allData.posts);
    })
    .post((req, res) => {
        uploader(req).then(result => {
            db.setPosts(result);
            res.redirect("/admin/blog");
        }).catch(e => {
            console.warn(e);
            res.redirect("/admin/blog", {errors: "some error"});
        });
    })
    .delete((request, response) => {
        const delatetElem = db.allData.posts.find(i => i.id = request.body);
        deleteImages(delatetElem.img, delatetElem["preview-img"]).then(() => {
            db.removePost(request.body).then(() => response.send("ok"));
        });
    });

router.route("/contacts")
    .get((req, res) => {
      res.send(db.allData.contacts);
    })
    .post((req, res) => {
      uploader(req).then(result => {
        db.setContact(result);
        res.redirect("/admin/contacts");
      }).catch(e => {
        console.warn(e);
        res.redirect("/admin/contacts", {errors: "some error"});
      });
    })

module.exports = router;

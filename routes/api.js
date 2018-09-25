const db = require("./util/data-base");
const nodemailer = require("nodemailer");
const router = require("express").Router();
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
        const id = request.body.id;
        const deletedElem = db.allData.users.find(i => i.id === id);
        deleteImages(deletedElem.img, deletedElem.previewImg).then(() => {
            db.removeUser(id).then(() => response.send('ok'));
        });
    });

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
        const deletedElem = db.allData.projects.find(i => i.id === id);
        deleteImages(deletedElem.img, deletedElem.previewImg).then(() => {
            db.removeProject(id).then(() => response.send('ok'));
        });
    });

router.route("/contacts")
    .get((req, res) => {
        res.send(db.allData.contacts);
    })
    .post((req, res) => {
        db.setContact(req.body).then(
            () => {
                if (res) {
                    res.redirect("/admin/contacts")
                } else {
                    res.redirect("/admin/contacts")
                }
            }
        )
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
        const id = request.body.id;
        const delatetElem = db.allData.posts.find(i => i.id === id);
        deleteImages(delatetElem.img, delatetElem["preview-img"]).then(() => {
            db.removePost(id).then(() => response.send("ok"));
        });
    });

router.route("/texts")
    .get((req, res) => {
        res.send(db.allData.texts)
    })
    .post((req, res) => {
        db.setTexts(req.body).then(
            () => {
                if (res) {
                    res.redirect("/admin/texts")
                } else {
                    res.redirect("/admin/texts")
                }
            }
        )
    });

router.route("/sendMessage")
    .post((req, res) => {
        new Promise((result, reject) => {
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                secure: false,
                port: 25,
                auth: {
                    user: 'beluy845@gmail.com',
                    pass: 'beluy625436',
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
            let mailOptions = {
                from: "Messages on Node server",
                to: "o.d.bilyi@gmail.com",
                subject: "New Messages",
                text: `
        user : ${req.body.user}
        email: ${req.body.email}
        site: ${req.body.site}`
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return reject(error);
                }
                console.log('Email sent: ' + info.response);
                res.send("ok");
                result(true);
            });
        })
    });

module.exports = router;

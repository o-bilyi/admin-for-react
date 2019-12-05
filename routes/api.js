const db = require("./util/data-base");
const nodemailer = require("nodemailer");
const router = require("express").Router();
const uploader = require("./util/file-uploader");
const deleteImages = require("./util/delete-image");

// Buffer.from("seq123").toString(typeEncrypt); example in Buffer.from('Hello World!').toString('base64') out Buffer.from(b64Encoded, 'base64').toString()

let key = null;
const cookieName = "cookieName";
const typeEncrypt = "base64";

const userName = "alex";
const userPassword = "123";

router.route("/login").post((req, res) => {
	const name = req.body.name;
	const password = req.body.password;

	if (name === userName && password === userPassword) {
		key = Buffer.from("seq123").toString(typeEncrypt);
		res.cookie(cookieName, key, { maxAge : 300000, httpOnly : true });
		res.status(200).render("index");
		return;
	}
	res.status(401).redirect("/admin");
});

router.route("/users").get(function(req, res) {
	res.send(db.allData.users);
}).post((req, res) => {
	uploader(req).then(result => {
		db.setUsers(result);
		res.redirect("/admin/users");
	}).catch(e => {
		console.warn(e);
		res.redirect("/admin/users", { errors : "some error" });
	});
}).delete((request, response) => {
	const id = request.body.id;
	const deletedElem = db.allData.users.find(i => i.id === id);
	deleteImages(deletedElem.img, deletedElem.previewImg).then(() => {
		db.removeUser(id).then(() => response.send("ok"));
	});
});

router.route("/projects").get((req, res) => {
	res.send(db.allData.projects);
}).post((req, res) => {
	uploader(req).then(result => {
		db.setProject(result);
		res.redirect("/admin/projects");
	}).catch(e => {
		console.warn(e);
		res.redirect("/admin/projects", { errors : "some error" });
	});
}).delete((request, response) => {
	const id = request.body.id;
	const deletedElem = db.allData.projects.find(i => i.id === id);
	deleteImages(deletedElem.img, deletedElem.previewImg).then(() => {
		db.removeProject(id).then(() => response.send("ok"));
	});
});

router.route("/contacts").get((req, res) => {
	res.send(db.allData.contacts);
}).post((req, res) => {
	db.setContact(req.body).then(
		() => {
			if (res) {
				res.redirect("/admin/contacts");
			} else {
				res.redirect("/admin/contacts");
			}
		}
	);
});

router.route("/posts").get((req, res) => {
	res.send(db.allData.posts);
}).post((req, res) => {
	uploader(req).then(result => {
		db.setPosts(result);
		res.redirect("/admin/blog");
	}).catch(e => {
		console.warn(e);
		res.redirect("/admin/blog", { errors : "some error" });
	});
}).delete((request, response) => {
	const id = request.body.id;
	const delatetElem = db.allData.posts.find(i => i.id === id);
	deleteImages(delatetElem.img, delatetElem["preview-img"]).then(() => {
		db.removePost(id).then(() => response.send("ok"));
	});
});

router.route("/texts").get((req, res) => {
	res.send(db.allData.texts);
}).post((req, res) => {
	db.setTexts(req.body).then(
		() => {
			if (res) {
				res.redirect("/admin/texts");
			} else {
				res.redirect("/admin/texts");
			}
		}
	);
});

router.route("/sendMessage").post((req, res) => {
	let transporter = nodemailer.createTransport({
		service : "gmail",
		secure : false,
		port : 25,
		auth : {
			user : "beluy845@gmail.com",
			pass : "beluy625436"
		},
		tls : {
			rejectUnauthorized : false
		}
	});
	let mailOptions = {
		from : "Messages on Node server",
		to : "o.d.bilyi@gmail.com",
		subject : "New Messages",
		text : `
        user : ${ req.body.user }
        email: ${ req.body.email }
        site: ${ req.body.site }`
	};
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			res.statusCode = 405;
			return res.send(error);
		}
		res.send("ok");
	});
});

module.exports = router;

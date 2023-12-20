const router = require("express").Router();
const db = require("./util/data-base");

const checkAuth = (req, res, next) => {
  const login = req.cookies.cookieName;

  Buffer.from(process.env.BUFFER_KEY).toString("base64")

  if (login === process.env.HASH) {
    next();
    return;
  }

  res.redirect("/");
};

// localhost:3000/admin/projects

router.route("/").get((req, res) => {
  res.render("login");
});

router.route("/projects").get(checkAuth, (req, res) => {
  res.render("projects", { projects: db.allData.projects });
});

router.route("/users").get(checkAuth, (req, res) => {
  res.render("users", { users: db.allData.users });
});

router.route("/contacts").get(checkAuth, (req, res) => {
  res.render("contacts", { contacts: db.allData.contacts });
});

router.route("/texts").get(checkAuth, (req, res) => {
  res.render("texts", { texts: db.allData.texts });
});

router.route("/blog").get(checkAuth, (req, res) => {
  res.render("blog", { posts: db.allData.posts });
});

module.exports = router;

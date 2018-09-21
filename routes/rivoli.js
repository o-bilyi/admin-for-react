const router  = require("express").Router();
const path = require("path");

router.route("/*").get((req, res) => {
    res.render("./rivoli")
});

module.exports = router;

const router  = require("express").Router();

router.route("/*").get((req, res) => {
    res.render("./rivoli");
});

module.exports = router;

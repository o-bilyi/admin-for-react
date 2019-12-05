const router  = require("express").Router();

router.route("/*").get((req, res) => {
    res.send("./rivoli");
});

module.exports = router;

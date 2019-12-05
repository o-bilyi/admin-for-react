const router = require('express').Router();
const path = require("path");

router.route('/*').get((req, res) => {
  res.sendFile(path.join(__dirname, '../public_admin/vipCafe/index.html'));
});

module.exports = router;

const express = require("express");
const router = express.Router();
const {
	profile,
	setting
} = require("../controller/mypage")


router.get("/:address", profile);
router.post("/:address", setting);


module.exports = router;
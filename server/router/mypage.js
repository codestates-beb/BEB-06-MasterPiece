const express = require("express");
const router = express.Router();
const {
	profile,
	setting, profiles
} = require("../controller/mypage")


router.get("/:address/all", profiles);
router.get("/:address", profile);
router.post("/:address", setting);


module.exports = router;
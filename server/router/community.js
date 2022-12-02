const express = require("express");
const router = express.Router();
const {
	community,
	list,
	description
} = require("../controller/community")

router.get("", community);
router.get("/:communityId", list);
router.get("/:communityId/description/:postId", description);

module.exports = router;


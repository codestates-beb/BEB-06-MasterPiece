const express = require("express");
const router = express.Router();
const {
	agenda,
	community,
	description,
	vote,
} = require("../controller/community")

router.get("", community);
router.post("/:postId", agenda)
router.get("/:postId", description);
router.post("/:postId/vote", vote);

module.exports = router;


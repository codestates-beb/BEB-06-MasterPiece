const express = require("express");
const router = express.Router();
const {
	agenda,
	community,
	description,
	vote, isVoted, result,
} = require("../controller/community")

router.get("", community);
router.post("/:postId", agenda)
router.get("/:postId", description);
router.post("/:postId/vote", vote);
router.get("/:postId/vote/result", result);
router.get("/:postId/vote/:address", isVoted);

module.exports = router;


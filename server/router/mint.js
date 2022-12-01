const express = require("express");
const router = express.Router();
const {
	find,
	mint
} = require("../controller/mint")

router.get("", find);
router.post("", mint);

module.exports = router;


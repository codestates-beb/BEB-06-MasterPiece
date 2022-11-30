const express = require("express");
const router = express.Router();
const {
	findAll
} = require("../controller/mint")

router.get("", findAll);

module.exports = router;


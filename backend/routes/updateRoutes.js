const express = require("express");

const router = express.Router({ mergeParams: true });

const { getUpdates, addUpdate } = require("../controllers/updateController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getUpdates).post(protect, addUpdate);

module.exports = router;

const express = require("express");
const reportController = require("../controllers/reports.js");

const router = express.Router();

router.get("/completed", reportController.getCompletedTask);
router.get("/:userId", reportController.getTasksByUser);

module.exports = router;

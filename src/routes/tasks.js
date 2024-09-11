const express = require("express");
const taskController = require("../controllers/tasks");

const router = express.Router();

router.get("/", taskController.getTasks);
router.post("/", taskController.createTask);
router.get("/:id", taskController.getTask);
router.post("/:id", taskController.updateStatus);

module.exports = router;

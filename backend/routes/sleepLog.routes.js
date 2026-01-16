const express = require("express");
const router = express.Router();
const sleepLogController = require("../controllers/sleepLog.controller");

router.post("/log", sleepLogController.createOrUpdateLog);
router.get("/log", sleepLogController.getDailyLog);
router.get("/weekly", sleepLogController.getWeeklyStats);

module.exports = router;
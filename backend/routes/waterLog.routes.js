const express = require("express");
const router = express.Router();
const waterLogController = require("../controllers/waterLog.controller");

router.post("/log", waterLogController.createOrUpdateLog);
router.get("/log", waterLogController.getDailyLog);
router.get("/weekly", waterLogController.getWeeklyStats);

module.exports = router;

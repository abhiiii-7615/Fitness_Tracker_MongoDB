const express = require("express");
const router = express.Router();
const calorieLogController = require("../controllers/calorieLog.controller");

router.post("/log", calorieLogController.createOrUpdateLog);
router.get("/log", calorieLogController.getDailyLog);
router.get("/weekly", calorieLogController.getWeeklyStats);

module.exports = router;

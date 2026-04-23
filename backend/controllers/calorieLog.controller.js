// controllers/calorieLogController.js
const DailyLog = require("../models/calorie.model");

exports.createOrUpdateLog = async (req, res) => {
  const { username, date, ...logData } = req.body;

  try {
    await DailyLog.findOneAndUpdate(
      { username, date },
      { $set: { ...logData } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({ message: "Log saved" });
  } catch (err) {
    res.status(500).json({ message: "Failed to store log", error: err.message });
  }
};

exports.getDailyLog = async (req, res) => {
  const { username, date } = req.query;

  try {
    const log = await DailyLog.findOne({ username, date });
    res.status(200).json(log || {});
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch log", error: err.message });
  }
};

exports.getWeeklyStats = async (req, res) => {
  const { username, endDate } = req.query;
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - 6);
  const startDateString = startDate.toISOString().split("T")[0];

  try {
    const logs = await DailyLog.find({
      username,
      date: { $gte: startDateString, $lte: endDate },
    }).sort({ date: 1 });

    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch weekly stats", error: err.message });
  }
};

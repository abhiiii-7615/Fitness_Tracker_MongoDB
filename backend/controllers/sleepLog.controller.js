const SleepLog = require("../models/sleep.model");

exports.createOrUpdateLog = async (req, res) => {
  const { username, date, sleepHours } = req.body;

  try {
    await SleepLog.findOneAndUpdate(
      { username, date },
      { $set: { sleepHours } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({ message: "Sleep log saved" });
  } catch (err) {
    res.status(500).json({ message: "Failed to store sleep log", error: err.message });
  }
};

exports.getDailyLog = async (req, res) => {
  const { username, date } = req.query;

  try {
    const log = await SleepLog.findOne({ username, date });
    res.status(200).json(log || {});
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch sleep log", error: err.message });
  }
};

exports.getWeeklyStats = async (req, res) => {
  const { username, endDate } = req.query;
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - 6);
  const startDateString = startDate.toISOString().split("T")[0];

  try {
    const logs = await SleepLog.find({
      username,
      date: { $gte: startDateString, $lte: endDate },
    }).sort({ date: 1 });
    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch weekly sleep stats", error: err.message });
  }
};

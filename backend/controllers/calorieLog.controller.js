// controllers/calorieLogController.js
const db = require("../models");
const DailyLog = db.calorie_log;

exports.createOrUpdateLog = async (req, res) => {
  const { username, date, ...logData } = req.body;

  try {
    const [log, created] = await DailyLog.findOrCreate({
      where: { username, date },
      defaults: { ...logData }
    });

    if (!created) {
      await log.update(logData);
    }

    res.status(200).json({ message: created ? "Log created" : "Log updated" });
  } catch (err) {
    res.status(500).json({ message: "Failed to store log", error: err.message });
  }
};

exports.getDailyLog = async (req, res) => {
  const { username, date } = req.query;

  try {
    const log = await DailyLog.findOne({ where: { username, date } });
    res.status(200).json(log || {});
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch log", error: err.message });
  }
};

exports.getWeeklyStats = async (req, res) => {
  const { username, endDate } = req.query;
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - 6);

  try {
    const logs = await DailyLog.findAll({
      where: {
        username,
        date: {
          [db.Sequelize.Op.between]: [startDate, endDate]
        }
      }
    });

    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch weekly stats", error: err.message });
  }
};

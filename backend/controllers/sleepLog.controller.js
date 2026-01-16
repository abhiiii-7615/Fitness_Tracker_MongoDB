const db = require("../models");
const SleepLog = db.sleep_log;

exports.createOrUpdateLog = async (req, res) => {
  const { username, date, sleepHours } = req.body;

  try {
    const [log, created] = await SleepLog.findOrCreate({
      where: { username, date },
      defaults: { sleepHours },
    });

    if (!created) {
      await log.update({ sleepHours });
    }

    res.status(200).json({ message: created ? "Sleep log created" : "Sleep log updated" });
  } catch (err) {
    res.status(500).json({ message: "Failed to store sleep log", error: err.message });
  }
};

exports.getDailyLog = async (req, res) => {
  const { username, date } = req.query;

  try {
    const log = await SleepLog.findOne({ where: { username, date } });
    res.status(200).json(log || {});
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch sleep log", error: err.message });
  }
};

exports.getWeeklyStats = async (req, res) => {
  const { username, endDate } = req.query;
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - 6);

  try {
    const logs = await SleepLog.findAll({
      where: {
        username,
        date: {
          [db.Sequelize.Op.between]: [startDate, endDate],
        },
      },
    });
    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch weekly sleep stats", error: err.message });
  }
};

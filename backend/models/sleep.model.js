module.exports = (sequelize, DataTypes) => {
  const SleepLog = sequelize.define("sleep_log", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    sleepHours: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  return SleepLog;
};
module.exports = (sequelize, DataTypes) => {
  const CalorieLog = sequelize.define("calorie_log", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username:{
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    calorieIntake: {
      type: DataTypes.FLOAT,
    }
  });
  return CalorieLog;
};

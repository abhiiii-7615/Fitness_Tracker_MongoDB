const mongoose = require("mongoose");

const calorieLogSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, index: true },
    date: { type: String, required: true, index: true },
    calorieIntake: { type: Number, default: 0 },
  },
  { timestamps: true }
);

calorieLogSchema.index({ username: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("CalorieLog", calorieLogSchema);

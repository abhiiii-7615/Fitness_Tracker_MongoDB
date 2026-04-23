const mongoose = require("mongoose");

const waterLogSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, index: true },
    date: { type: String, required: true, index: true },
    waterIntake: { type: Number, default: 0 },
  },
  { timestamps: true }
);

waterLogSchema.index({ username: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("WaterLog", waterLogSchema);

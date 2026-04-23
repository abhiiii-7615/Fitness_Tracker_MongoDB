const mongoose = require("mongoose");

const sleepLogSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, index: true },
    date: { type: String, required: true, index: true },
    sleepHours: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

sleepLogSchema.index({ username: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("SleepLog", sleepLogSchema);
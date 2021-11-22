const mongoose = require("mongoose");

module.exports = mongoose.model(
  "warnings",
  new mongoose.Schema({
    userId: String,
    guildId: String,
    reason: String,
    moderatorId: String,
    timestamp: Number,
  })
);

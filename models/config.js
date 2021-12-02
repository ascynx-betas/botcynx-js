const mongoose = require("mongoose");

module.exports = mongoose.model(
  "config",
  new mongoose.Schema({
    name: String,
    guildId: String,
    trigger: Array,
    bypass: Array,
    removable: Array,
    logchannel: String,
    su: Array,
    verify: String,
    blocked: Array,
  })
);

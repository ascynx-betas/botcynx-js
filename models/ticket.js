const mongoose = require("mongoose");

module.exports = mongoose.model(
  "ticket",
  new mongoose.Schema({
    channel: String,
    name: String,
    welcomemessage: String,
    linkedmessage: String,
    guildId: String,
    blocked: String,
  })
);

const mongoose = require("mongoose");

module.exports = mongoose.model(
  "verify",
  new mongoose.Schema({
    userId: String,
    minecraftuuid: String,
    labels: Array,
    oldlinked: Array,
  })
);
//later gonna add old linked accounts to it for some reason, i feel like it would be cool to have

const mongoose = require('mongoose');

module.exports = mongoose.model('role', new mongoose.Schema({ 
    roleId: String,
    guildId: String,
    type: String,
}))
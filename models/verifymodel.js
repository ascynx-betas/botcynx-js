const mongoose = require('mongoose');

module.exports = mongoose.model('verify', new mongoose.Schema({ 
    userId: String,
    guildId: String,
    minecraftIGN: String,
}))
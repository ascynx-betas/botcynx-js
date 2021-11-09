const mongoose = require('mongoose');

module.exports = mongoose.model('verify', new mongoose.Schema({ 
    userId: String,
    minecraftuuid: String,
}))
//later gonna be used to store discord id + minecraft uuid to use commands in a better way
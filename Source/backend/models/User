const mongoose = require('mongoose');

// parse Schema json
const raw_01 = require('../schema/user.json');

// create a schema
const userSchema = mongoose.Schema(raw_01);

// compile the model
const User = mongoose.model('user', userSchema);

// export
module.exports = User;
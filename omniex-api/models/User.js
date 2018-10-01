const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  avatar: String,
  name: String,
  favorites: {
    type: [String],
    default: []
  }
}, { usePushEach: true });

module.exports = mongoose.model('users', userSchema);

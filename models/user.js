const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  adult: { type: Boolean, default: true },
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
});

userSchema.statics.format = user => ({
  id: user.id,
  username: user.username,
  name: user.name,
  adult: user.adult
});

userSchema.statics.formatDeep = user => ({
  id: user.id,
  username: user.username,
  name: user.name,
  adult: user.adult,
  blogs: user.blogs
});

const User = mongoose.model('User', userSchema);

module.exports = User;

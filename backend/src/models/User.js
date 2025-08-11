const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' }],
  subscriptions: [{ type: String }],
  roles: { type: [String], default: ['user'] },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);

const mongoose = require('mongoose');

const PodcastSchema = new mongoose.Schema({
  title: { type: String, required: true },
  publisher: { type: String, required: true },
  image: { type: String },
  description: { type: String },
  url: { type: String },
});

module.exports = mongoose.model('Podcast', PodcastSchema);

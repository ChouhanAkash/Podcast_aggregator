const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const Podcast = require('../models/Podcast');

const router = express.Router();

const PodcastCacheSchema = new mongoose.Schema({
  query: { type: String, required: true, unique: true },
  results: { type: Array, required: true },
  createdAt: { type: Date, default: Date.now, expires: 3600 }
});
const PodcastCache = mongoose.model('PodcastCache', PodcastCacheSchema);

const LISTEN_NOTES_API_KEY = process.env.LISTEN_NOTES_API_KEY;
const LISTEN_NOTES_URL = 'https://listen-api.listennotes.com/api/v2/search';

router.get('/search', async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ message: 'Query is required' });
  let cache = await PodcastCache.findOne({ query: q });
  if (cache) {
    return res.json({ fromCache: true, results: cache.results });
  }
  try {
    const response = await axios.get(LISTEN_NOTES_URL, {
      params: { q },
      headers: { 'X-ListenAPI-Key': LISTEN_NOTES_API_KEY }
    });
    const results = response.data.results;
    await PodcastCache.create({ query: q, results });
    res.json({ fromCache: false, results });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch podcasts', error: err.message });
  }
});

router.post('/sample', async (req, res) => {
  const samples = [
    {
      title: 'The Daily Byte',
      publisher: 'Tech Media',
      image: 'https://placehold.co/100x100/7c3aed/fff?text=Byte',
      description: 'Daily tech news and interviews.',
      url: 'https://example.com/daily-byte',
    },
    {
      title: 'History Unplugged',
      publisher: 'History Hub',
      image: 'https://placehold.co/100x100/222/fff?text=History',
      description: 'Uncovering the past, one episode at a time.',
      url: 'https://example.com/history-unplugged',
    },
    {
      title: 'Mindful Minutes',
      publisher: 'Wellness Co',
      image: 'https://placehold.co/100x100/4caf50/fff?text=Mindful',
      description: 'Meditation and mindfulness for busy people.',
      url: 'https://example.com/mindful-minutes',
    },
    {
      title: 'Startup Stories',
      publisher: 'Founders Weekly',
      image: 'https://placehold.co/100x100/ff9800/fff?text=Startup',
      description: 'Real stories from startup founders.',
      url: 'https://example.com/startup-stories',
    },
    {
      title: 'Science Simplified',
      publisher: 'LabCast',
      image: 'https://placehold.co/100x100/2196f3/fff?text=Science',
      description: 'Making science accessible to everyone.',
      url: 'https://example.com/science-simplified',
    },
    {
      title: 'Book Club',
      publisher: 'Readers United',
      image: 'https://placehold.co/100x100/9c27b0/fff?text=Books',
      description: 'A podcast for book lovers.',
      url: 'https://example.com/book-club',
    },
    {
      title: 'Fitness Focus',
      publisher: 'Active Life',
      image: 'https://placehold.co/100x100/e91e63/fff?text=Fitness',
      description: 'Tips and interviews for a healthy lifestyle.',
      url: 'https://example.com/fitness-focus',
    },
    {
      title: 'World News Weekly',
      publisher: 'Global Media',
      image: 'https://placehold.co/100x100/607d8b/fff?text=News',
      description: 'A roundup of the week’s top news stories.',
      url: 'https://example.com/world-news-weekly',
    },
    {
      title: 'Comedy Hour',
      publisher: 'Laugh Factory',
      image: 'https://placehold.co/100x100/ffc107/222?text=Comedy',
      description: 'Stand-up and sketches from top comedians.',
      url: 'https://example.com/comedy-hour',
    },
    {
      title: 'Travel Diaries',
      publisher: 'Wanderlust',
      image: 'https://placehold.co/100x100/00bcd4/fff?text=Travel',
      description: 'Adventures and stories from around the globe.',
      url: 'https://example.com/travel-diaries',
    },
  ];
  try {
    await Podcast.insertMany(samples);
    res.json({ message: 'Sample podcasts added.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add samples', error: err.message });
  }
});

router.post('/searchbar', async (req, res) => {
  const { q } = req.body;
  if (!q) return res.status(400).json({ message: 'Query is required' });
  try {
    const regex = new RegExp(q, 'i');
    const results = await Podcast.find({
      $or: [
        { title: regex },
        { publisher: regex },
        { description: regex },
      ],
    });
    res.json({ results });
  } catch (err) {
    res.status(500).json({ message: 'Failed to search podcasts', error: err.message });
  }
});

router.get('/all', async (req, res) => {
  try {
    const podcasts = await Podcast.find({});
    res.json({ podcasts });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch podcasts', error: err.message });
  }
});

module.exports = router;

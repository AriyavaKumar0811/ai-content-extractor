const express = require('express');
const axios = require('axios');
const { JSDOM } = require('jsdom');
const { Readability } = require('@mozilla/readability');
const Content = require('../models/Content');

const router = express.Router();

router.post('/', async (req, res) => {
  const { url } = req.body;
  try {
    const response = await axios.get(url);
    const dom = new JSDOM(response.data, { url });
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    const newContent = new Content({
      url,
      extractedText: article.textContent,
    });

    await newContent.save();
    res.status(201).json(newContent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to extract content' });
  }
});

router.get('/', async (req, res) => {
  const contents = await Content.find().sort({ createdAt: -1 });
  res.json(contents);
});

module.exports = router;

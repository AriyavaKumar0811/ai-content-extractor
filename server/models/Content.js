const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  url: { type: String, required: true },
  extractedText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Content', contentSchema);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const contentRoutes = require('./routes/contentRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/content', contentRoutes);

mongoose.connect('mongodb+srv://ariyavasai:T8LzKh4zynDpCHVK@ai-content.xit3it2.mongodb.net/contentExtractor', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => app.listen(5000, () => console.log('Server running on port 5000')))
.catch((err) => console.log(err));

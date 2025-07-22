const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

// Example request:
// GET /api/torrents?site=1337x&query=avengers&page=1
app.get('/api/torrents', async (req, res) => {
  try {
    const { site, query, page = '1' } = req.query;

    if (!site || !query) {
      return res.status(400).json({ error: 'Missing required query parameters: site and query' });
    }

    const apiUrl = `https://torrents-api.ryukme.repl.co/api/${site}/${encodeURIComponent(query)}/${page}`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
      return res.status(500).json({ error: 'Failed to fetch from torrent API' });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Torrent proxy backend running on http://localhost:${PORT}`);
});

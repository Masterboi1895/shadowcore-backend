const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

/**
 * Proxy endpoint:
 * GET /api/torrents?site=1337x&query=avengers&page=1
 * Calls https://torrents-api.ryukme.repl.co/api/{site}/{query}/{page}
 */
app.get('/api/torrents', async (req, res) => {
  try {
    const { site, query, page = '1' } = req.query;

    if (!site || !query) {
      return res.status(400).json({ error: 'Missing required query parameters: site and query' });
    }

    const apiUrl = `https://torrents-api.ryukme.repl.co/api/${site}/${encodeURIComponent(query)}/${page}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      return res.status(502).json({ error: 'Failed to fetch from torrents API' });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching torrents:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`ShadowCore Backend running on port ${PORT}`);
});

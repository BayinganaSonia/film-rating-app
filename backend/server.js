const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

app.get('/api/popular', async (req, res) => {
  try {
    const response = await axios.get('https://film-show-ratings.p.rapidapi.com/popular/?type=film', {
      headers: {
        'x-rapidapi-host': 'film-show-ratings.p.rapidapi.com',
        'x-rapidapi-key': process.env.RAPIDAPI_KEY
      }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'API Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


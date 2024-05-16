// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/proxy', async (req, res) => {
  try {
    console.log('Proxy request received'); 
    const url = 'https://archive.org/advancedsearch.php?q=%28collection%3Asproutdistro+OR+collection%3Azines_inbox%29+AND+language%3A%28English+OR+eng%29+AND+date%3A%5B2010-01-01+TO+*%5D&fl%5B%5D=avg_rating&fl%5B%5D=btih&fl%5B%5D=collection&fl%5B%5D=contributor&fl%5B%5D=creator&fl%5B%5D=date&fl%5B%5D=description&fl%5B%5D=downloads&fl%5B%5D=format&fl%5B%5D=identifier&fl%5B%5D=imagecount&fl%5B%5D=language&fl%5B%5D=mediatype&fl%5B%5D=name&fl%5B%5D=num_reviews&fl%5B%5D=publisher&fl%5B%5D=source&fl%5B%5D=subject&fl%5B%5D=title&sort%5B%5D=&sort%5B%5D=&sort%5B%5D=&rows=1000&page=1&output=json';
    const response = await axios.get(url);
    console.log('API response received'); 
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


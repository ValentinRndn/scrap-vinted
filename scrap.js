const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/search', async (req, res) => {
  const searchText = req.body.search_text;
  const priceFrom = req.body.price_from;
  const priceTo = req.body.price_to;

  const url = `https://www.vinted.fr/api/v2/catalog/items?search_text=${searchText}&price_from=${priceFrom}&price_to=${priceTo}`;
  const response = await axios.get(url);
  const items = response.data.items;

  res.send(items.map(item => `<p>${item.title}: ${item.price}€</p>`).join(''));
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

const express = require('express');
const cors = require('cors'); // Add this line
const { getQuote } = require('./controllers/quoteController');
const { getTokens } = require('./controllers/tokenController');
const app = express();

app.use(cors()); // Add this line
app.use(express.json());

app.get('/Tokens', getTokens);
app.get('/quote', getQuote);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


module.exports = app;
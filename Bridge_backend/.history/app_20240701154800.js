const express = require('express');
const tokenRoutes = require('./routes/tokenRoutes');
const quoteRoutes = require('./routes/quoteRoutes');

const app = express();

app.use(express.json());

app.use('/api/tokens', tokenRoutes);
app.use('/api/quotes', quoteRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv"); 
const scrapNewsRoutes = require('./Routes/scrapeNewsRoutes');
const scrapeTwitterRoutes = require('./Routes/scrapeTwitterRoutes');

const app = express();

// Middleware
dotenv.config();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/scrapeNews', scrapNewsRoutes);
app.use('/api/scrapeTwitter', scrapeTwitterRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
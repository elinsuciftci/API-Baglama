const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/products');
const { port } = require('./config');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/products', productRoutes);

// Sunucuyu Başlat
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

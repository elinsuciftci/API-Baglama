const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/order');
const returnRoutes = require('./routes/return');
const { port } = require('./config');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/return', returnRoutes);

// Sunucuyu Başlat
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

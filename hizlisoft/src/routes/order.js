const express = require('express');
const { getSuppliersAddresses} = require('../services/trendyolService');

const router = express.Router();
router.get('/order/sellers/{sellerId}/orders', async (req, res) => {
    try {
        const trendyolResponse = await getSuppliersAddresses();
        res.status(200).json(trendyolResponse);
    } catch (error) {
        console.error('Trendyol Get Shipment Packages Error:', error.message);
        res.status(500).json({ error: 'Trendyol API Hatası' });
    }
});
module.exports = router;
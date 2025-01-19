const express = require('express');
const { addProduct, deleteProduct, getOrders } = require('../services/trendyolService');

const router = express.Router();

// ERP'den ürün ekleme talebi
router.post('/', async (req, res) => {
    try {
        const trendyolResponse = await addProduct(req.body);
        res.status(200).json(trendyolResponse);
    } catch (error) {
        console.error('Trendyol Add Product Error:', error.message);
        res.status(500).json({ error: 'Trendyol API Hatası' });
    }
});

// ERP'den ürün silme talebi
router.delete('/:id', async (req, res) => {
    try {
        const trendyolResponse = await deleteProduct(req.params.id);
        res.status(200).json(trendyolResponse);
    } catch (error) {
        console.error('Trendyol Delete Product Error:', error.message);
        res.status(500).json({ error: 'Trendyol API Hatası' });
    }
});

// Siparişleri Trendyol'dan çekme
router.get('/orders', async (req, res) => {
    try {
        const trendyolResponse = await getOrders();
        res.status(200).json(trendyolResponse);
    } catch (error) {
        console.error('Trendyol Get Orders Error:', error.message);
        res.status(500).json({ error: 'Trendyol API Hatası' });
    }
});

module.exports = router;

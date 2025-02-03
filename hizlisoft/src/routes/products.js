// iki tarafı al ver yapıp hata kontrolü yaptığımız kısım

const express = require('express');
const { addProduct, deleteProduct, getOrders,getAddresses } = require('../services/trendyolService');

const router = express.Router();

router.post('/products', async (req, res) => {
    try {
        const trendyolResponse = await addProduct(req.body);
        res.status(200).json(trendyolResponse);
    } catch (error) {
        console.error('Trendyol Add Product Error:', error.message);
        res.status(500).json({ error: 'Trendyol hizlisoft Hatası' });
    }
});



router.delete('/:id', async (req, res) => {
    try {
        const trendyolResponse = await deleteProduct(req.params.id);
        res.status(200).json(trendyolResponse);
    } catch (error) {
        console.error('Trendyol Delete Product Error:', error.message);
        res.status(500).json({ error: 'Trendyol API Hatası' });
    }
});


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

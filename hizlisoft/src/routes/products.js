// iki tarafı al ver yapıp hata kontrolü yaptığımız kısım

const express = require('express');
const { addProduct,updateProduct, updatePriceAndInventory, getSuppliersAddresses,
    getCategoryTree, getCategoryAttributes, getBatchRequestResult
} = require('../services/trendyolService');

const router = express.Router();

router.post('/sellers/${sellerId}/products', async (req, res) => {
    try {
        const trendyolResponse = await addProduct(req.body);
        res.status(200).json(trendyolResponse);
    } catch (error) {
        console.error('Trendyol Add Product Error:', error.message);
        res.status(500).json({ error: 'Trendyol hizlisoft Hatası' });
    }
});
router.post('/sellers/{sellerId}/products', async (req, res) => {
    try {
        const trendyolResponse = await updateProduct(req.body);
        res.status(200).json(trendyolResponse);
    } catch (error) {
        console.error('Trendyol Update Products Error:', error.message);
        res.status(500).json({ error: 'Trendyol hizlisoft Hatası' });
    }
});
router.post('/sellers/${sellerId}/products/price-and-inventory', async (req, res) => {
    try {
        const trendyolResponse = await updatePriceAndInventory(req.body);
        res.status(200).json(trendyolResponse);
    } catch (error) {
        console.error('Trendyol Update Price and Inventory Error:', error.message);
        res.status(500).json({ error: 'Trendyol hizlisoft Hatası' });
    }
});
router.get('/sellers/${sellerId}/addresses', async (req, res) => {
    try {
        const trendyolResponse = await getSuppliersAddresses();
        res.status(200).json(trendyolResponse);
    } catch (error) {
        console.error('Trendyol Get Suplier Addresses Error:', error.message);
        res.status(500).json({ error: 'Trendyol API Hatası' });
    }
});
router.get('/brands', async (req, res) => {
    try {
        const trendyolResponse = await getBrands();
        res.status(200).json(trendyolResponse);
    } catch (error) {
        console.error('Trendyol Get Brands Error:', error.message);
        res.status(500).json({ error: 'Trendyol API Hatası' });
    }
});
router.get('/product-categories', async (req, res) => {
    try {
        const trendyolResponse = await getCategoryTree();
        res.status(200).json(trendyolResponse);
    } catch (error) {
        console.error('Trendyol Get Category Tree Error:', error.message);
        res.status(500).json({ error: 'Trendyol API Hatası' });
    }
});
router.get('/product-categories/{categoriId}/attributes', async (req, res) => {
    try {
        const trendyolResponse = await getCategoryAttributes();
        res.status(200).json(trendyolResponse);
    } catch (error) {
        console.error('Trendyol Get Category Attributes Error:', error.message);
        res.status(500).json({ error: 'Trendyol API Hatası' });
    }
});
router.get('/sellers/{sellerId}/products/batch-requests/{batchRequestId}', async (req, res) => {
    try {
        const trendyolResponse = await getBatchRequestResult();
        res.status(200).json(trendyolResponse);
    } catch (error) {
        console.error('Trendyol Get Batch Request Result Error:', error.message);
        res.status(500).json({ error: 'Trendyol API Hatası' });
    }
});


module.exports = router;

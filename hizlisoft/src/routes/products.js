// İki tarafı al ver yapıp hata kontrolü yaptığımız kısım
const express = require('express');
const {
    addProduct, updateProduct, updatePriceAndInventory, getSuppliersAddresses,
    getCategoryTree, getCategoryAttributes, getBatchRequestResult, getBrands
} = require('../services/trendyolService');

const router = express.Router();

router.post('/sellers/:sellerId/products', async (req, res) => {
    try {
        const trendyolResponse = await addProduct(req.body);
        res.status(200).json(trendyolResponse);
    } catch (error) {
        console.error('Trendyol Add Product Error:', error.message);
        res.status(500).json({ error: 'Trendyol API Hatası', details: error.response?.data || error.message });
    }
});

router.post('/sellers/:sellerId/products/update', async (req, res) => {
    try {
        const {
            barcode, title, productMainId, brandId, categoryId, quantity,
            stockCode, dimensionalWeight, description, currencyType,
            listPrice, salePrice, cargoCompanyId, deliveryDuration,
            deliveryOption, images, vatRate, shipmentAddressId,
            returningAddressId, attributes
        } = req.body;

        if (!barcode || !title || !productMainId || !brandId || !categoryId ||
            quantity === undefined || !stockCode || !dimensionalWeight || !description ||
            !currencyType || listPrice === undefined || salePrice === undefined ||
            !cargoCompanyId || !deliveryDuration || !deliveryOption ||
            !images || images.length === 0 || !vatRate || !shipmentAddressId ||
            !returningAddressId || !attributes || attributes.length === 0) {
            return res.status(400).json({ error: 'Eksik Parametre' });
        }

        const trendyolResponse = await updateProduct(req.body);
        res.status(200).json(trendyolResponse);
    } catch (error) {
        console.error('Trendyol Update Product Error:', error.message);
        res.status(500).json({ error: 'Trendyol API Hatası', details: error.response?.data || error.message });
    }
});

router.post('/sellers/:sellerId/products/price-and-inventory', async (req, res) => {
    try {
        const { barcode, quantity, listPrice, salePrice } = req.body;

        if (!barcode || quantity === undefined || listPrice === undefined || salePrice === undefined) {
            return res.status(400).json({ error: 'Eksik Parametre: barcode, quantity, listPrice ve salePrice gereklidir.' });
        }

        const trendyolResponse = await updatePriceAndInventory(barcode, quantity, listPrice, salePrice);
        res.status(200).json(trendyolResponse);
    } catch (error) {
        console.error('Trendyol Update Price and Inventory Error:', error.message);
        res.status(500).json({ error: 'Trendyol API Hatası', details: error.response?.data || error.message });
    }
});

router.get('/sellers/:sellerId/addresses', async (req, res) => {
    try {
        const trendyolResponse = await getSuppliersAddresses();
        res.status(200).json(trendyolResponse);
    } catch (error) {
        console.error('Trendyol Get Supplier Addresses Error:', error.message);
        res.status(500).json({ error: 'Trendyol API Hatası', details: error.response?.data || error.message });
    }
});

router.get('/brands', async (req, res) => {
    try {
        const trendyolResponse = await getBrands();
        res.status(200).json(trendyolResponse);
    } catch (error) {
        console.error('Trendyol Get Brands Error:', error.message);
        res.status(500).json({ error: 'Trendyol API Hatası', details: error.response?.data || error.message });
    }
});

router.get('/product-categories', async (req, res) => {
    try {
        const trendyolResponse = await getCategoryTree();
        res.status(200).json(trendyolResponse);
    } catch (error) {
        console.error('Trendyol Get Category Tree Error:', error.message);
        res.status(500).json({ error: 'Trendyol API Hatası', details: error.response?.data || error.message });
    }
});

router.get('/product-categories/:categoriId/attributes', async (req, res) => {
    try {
        const trendyolResponse = await getCategoryAttributes(req.params.categoriId);
        res.status(200).json(trendyolResponse);
    } catch (error) {
        console.error('Trendyol Get Category Attributes Error:', error.message);
        res.status(500).json({ error: 'Trendyol API Hatası', details: error.response?.data || error.message });
    }
});

router.get('/sellers/:sellerId/products/batch-requests/:batchRequestId', async (req, res) => {
    try {
        const trendyolResponse = await getBatchRequestResult(req.params.batchRequestId);
        res.status(200).json(trendyolResponse);
    } catch (error) {
        console.error('Trendyol Get Batch Request Result Error:', error.message);
        res.status(500).json({ error: 'Trendyol API Hatası', details: error.response?.data || error.message });
    }
});

module.exports = router;

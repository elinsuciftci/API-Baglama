const express = require('express');
const {getShipmentPackages, updatePackage, updateTrackingNumber} = require("../services/orderService");

const router = express.Router();
router.get('/order/sellers/{sellerId}/orders', async (req, res) => {
    try {
        const trendyolResponse = await getShipmentPackages();
        res.status(200).json(trendyolResponse);
    } catch (error) {
        console.error('Trendyol Get Shipment Packages Error:', error.message);
        res.status(500).json({ error: 'Trendyol API Hatası' });
    }
});
router.post('/order/sellers/{sellerId}/shipment-packages/{packageId}/split-packages', async (req, res) => {
    try {
        const { orderLineId, quantities } = req.body;

        if (!orderLineId || !quantities || quantities.length === 0) {
            return res.status(400).json({ error: 'Eksik parametreler: orderLineId ve quantities gereklidir.' });
        }

        const splitData = { orderLineId, quantities };
        const trendyolResponse = await splitShipmentPackage(splitData);

        res.status(200).json(trendyolResponse);
    } catch (error) {
        console.error('Trendyol Split Shipment Package Error:', error.message);
        res.status(500).json({ error: 'Trendyol API Hatası', details: error.response?.data || error.message });
    }
});
router.post('/order/sellers/{sellerId}/shipment-packages/{packageId}/items/unsupplied', async (req, res) => {
    try {
        const {
          lineId,quantity } = req.body;

        if ( lineId == undefined || quantity== undefined ) {
            return res.status(400).json({ error: 'Eksik Parametre' });
        }
        const trendyolResponse = await updatePackage(lineId, quantity);
        res.status(200).json(trendyolResponse);
    } catch (error) {
        console.error('Trendyol Update Package Error:', error.message);
        res.status(500).json({ error: 'Trendyol API Hatası', details: error.response?.data || error.message });
    }
});
router.post('/order/sellers/{sellerId}/shipment-packages/{packageId}/items/unsupplied', async (req, res) => {
    try {
        const {
          trackingNumber
        } = req.body;

        if ( trackingNumber == undefined  ) {
            return res.status(400).json({ error: 'Eksik Parametre' });
        }
        const trendyolResponse = await updateTrackingNumber(trackingNumber);
        res.status(200).json(trendyolResponse);
    } catch (error) {
        console.error('Trendyol Update Tracking Number Error:', error.message);
        res.status(500).json({ error: 'Trendyol API Hatası', details: error.response?.data || error.message });
    }
});
router.post('/sellers/:sellerId/seller-invoice-links', async (req, res) => {
    try {
        const { invoiceLink, shipmentPackageId, invoiceDateTime, invoiceNumber } = req.body;

        if (!invoiceLink || !shipmentPackageId || !invoiceDateTime || !invoiceNumber) {
            return res.status(400).json({ error: 'Eksik parametreler: invoiceLink, shipmentPackageId, invoiceDateTime ve invoiceNumber gereklidir.' });
        }

        const invoiceData = { invoiceLink, shipmentPackageId, invoiceDateTime, invoiceNumber };
        const trendyolResponse = await sendInvoiceLink(invoiceData);

        res.status(200).json(trendyolResponse);
    } catch (error) {
        console.error('Trendyol Send Invoice Link Error:', error.message);
        res.status(500).json({ error: 'Trendyol API Hatası', details: error.response?.data || error.message });
    }
});
module.exports = router;
const axios = require('axios');
const { trendyolBaseUrl, sellerId, apiToken } = require('../config');

const trendyolClient = axios.create({
    baseURL: `${trendyolBaseUrl}/integration`,
    headers: {
        Authorization: `Bearer ${apiToken}`,
    },
});

const getShipmentPackages = async () => {
    try {
        const response = await trendyolClient.get(`/order/sellers/${sellerId}/orders`);
        return response.data;
    } catch (error) {
        console.error('Error fetching shipment packages:', error.response?.status, error.response?.data || error.message);
        throw error;
    }
};

const splitShipmentPackage = async (packageId, data) => {
    try {
        const payload = {
            splitPackages: [{
                packageDetails: [{
                    orderLineId: data.orderLineId,
                    quantities: data.quantities
                }]
            }]
        };

        const response = await trendyolClient.post(`/order/sellers/${sellerId}/shipment-packages/${packageId}/split-packages`, payload);
        return response.data;
    } catch (error) {
        console.error('Error splitting shipment package:', error.response?.status, error.response?.data || error.message);
        throw error;
    }
};

const updatePackage = async (packageId, data) => {
    try {
        const payload = {
            lines: [{
                lineId: data.lineId,
                quantity: data.quantity,
            }],
            reasonId: data.reasonId,
        };

        const response = await trendyolClient.post(`/order/sellers/${sellerId}/shipment-packages/${packageId}`, payload);
        return response.data;
    } catch (error) {
        console.error('Error updating package:', error.response?.status, error.response?.data || error.message);
        throw error;
    }
};

const updateTrackingNumber = async (packageId, data) => {
    try {
        const payload = {
            trackingNumber: data.trackingNumber,
        };

        const response = await trendyolClient.post(`/order/sellers/${sellerId}/shipment-packages/${packageId}/update-tracking-number`, payload);
        return response.data;
    } catch (error) {
        console.error('Error updating tracking number:', error.response?.status, error.response?.data || error.message);
        throw error;
    }
};

const sendInvoiceLink = async (data) => {
    try {
        const payload = {
            invoiceLink: data.invoiceLink,
            shipmentPackageId: data.shipmentPackageId,
            invoiceDateTime: data.invoiceDateTime,
            invoiceNumber: data.invoiceNumber,
        };

        const response = await trendyolClient.post(`/sellers/${sellerId}/seller-invoice-links`, payload);
        return response.data;
    } catch (error) {
        console.error('Error sending invoice link:', error.response?.status, error.response?.data || error.message);
        throw error;
    }
};

module.exports = {
    getShipmentPackages,
    splitShipmentPackage,
    updatePackage,
    updateTrackingNumber,
    sendInvoiceLink
};

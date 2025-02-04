//trendyol fonksiyonlarını yönettiğimiz kısım

const axios = require('axios');
const {trendyolBaseUrl, sellerId, apiToken} = require('../config');

const trendyolClient = axios.create({
    baseURL: `${trendyolBaseUrl}/integration/product`, headers: {
        Authorization: `Bearer ${apiToken}`,
    },
});
const addProduct = async (data) => {
    try {
        const payload = {
            items: [{
                barcode: data.barcode,
                title: data.title,
                productMainId: data.productMainId,
                brandId : data.brandId,
                categoryId : data.categoryId,
                quantity: data.quantity,
                stockCode : data.stockCode,
                dimensionalWeight : data.dimensionalWeight,
                description : data.description,
                currencyType : data.currencyType,
                listPrice : data.listPrice,
                salePrice : data.salePrice,
                cargoCompanyId: data.cargoCompanyId,
                deliveryDuration : data.deliveryDuration,
                deliveryOption: data.deliveryOption,
                images: data.images,
                vatRate : data.vatRate,
                shipmentAddressId: data.shipmentAddressId,
                returningAddressId: data.returningAddressId,
                attributes:data.attributes
            }]
        };

        const response = await trendyolClient.post(`/sellers/${sellerId}/products`, payload);
        return response.data;
    } catch (error) {
        console.error('Error updating price and inventory:', error.response?.data || error.message);
        throw error;
    }
};
const updateProduct= async (data) => {
    try {
        const payload = {
            items: [{
                barcode: data.barcode,
                title: data.title,
                productMainId: data.productMainId,
                brandId : data.brandId,
                categoryId : data.categoryId,
                quantity: data.quantity,
                stockCode : data.stockCode,
                dimensionalWeight : data.dimensionalWeight,
                description : data.description,
                currencyType : data.currencyType,
                listPrice : data.listPrice,
                salePrice : data.salePrice,
                cargoCompanyId: data.cargoCompanyId,
                deliveryDuration : data.deliveryDuration,
                deliveryOption: data.deliveryOption,
                images: data.images,
                vatRate : data.vatRate,
                shipmentAddressId: data.shipmentAddressId,
                returningAddressId: data.returningAddressId,
                attributes:data.attributes
            }]
        };

        const response = await trendyolClient.post(`/sellers/{sellerId}/products`, payload);
        return response.data;
    } catch (error) {
        console.error('Error updating products:', error.response?.data || error.message);
        throw error;
    }
};

const updatePriceAndInventory = async (data) => {
    try {
        const payload = {
            items: [{
                barcode: data.barcode,
                quantity: data.quantity,
                listPrice : data.listPrice,
                salePrice : data.salePrice,
            }]
        };

        const response = await trendyolClient.post(`/sellers/${sellerId}/products/price-and-inventory`, payload);
        return response.data;
    } catch (error) {
        console.error('Error updating price and inventory:', error.response?.data || error.message);
        throw error;
    }
};

const getSuppliersAddresses = async () => {
    const response = await trendyolClient.get('/sellers/${sellerId}/addresses');
    return response.data;
};
const getBrands = async () => {
    const response = await trendyolClient.get('/brands');
    return response.data;
};
const getCategoryTree = async () => {
    const response = await trendyolClient.get('/product-categories');
    return response.data;
};
const getCategoryAttributes = async () => {
    const response = await trendyolClient.get('/product-categories/{categoriId}/attributes');
    return response.data;
};
const getBatchRequestResult = async () => {
    const response = await trendyolClient.get('/sellers/{sellerId}/products/batch-requests/{batchRequestId}');
    return response.data;
};


module.exports = {
    addProduct,updateProduct, updatePriceAndInventory, getSuppliersAddresses, getBrands, getCategoryTree, getCategoryAttributes,getBatchRequestResult,
};

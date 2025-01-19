// const axios = require('axios');
// const { trendyolBaseUrl, supplierId, apiToken } = require('../config');
//
// const trendyolClient = axios.create({
//     baseURL: `${trendyolBaseUrl}/suppliers/${supplierId}`,
//     headers: {
//         Authorization: `Bearer ${apiToken}`,
//     },
// });
//
// const addProduct = async (productData) => {
//     const response = await trendyolClient.post('/products', {
//         items: [productData],
//     });
//     return response.data;
// };
//
// const deleteProduct = async (productId) => {
//     const response = await trendyolClient.delete(`/products/${productId}`);
//     return response.data;
// };
//
// const getOrders = async () => {
//     const response = await trendyolClient.get('/orders');
//     return response.data;
// };
//
// module.exports = {
//     addProduct,
//     deleteProduct,
//     getOrders,
// };

const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const { trendyolBaseUrl, sellerId, apiToken } = require('../config');

const trendyolClient = axios.create({
    baseURL: `${trendyolBaseUrl}/integration`,
    headers: {
        Authorization: `Bearer ${apiToken}`,
    },
});


const issueClaim = async (claimId, claimIssueReasonId, claimItemIdList, description, filePath) => {
    try {
        const formData = new FormData();
        formData.append('files', fs.createReadStream(filePath));

        const response = await trendyolClient.post(
            `/claims/${claimId}/issue?claimIssueReasonId=${claimIssueReasonId}&claimItemIdList=${claimItemIdList}&description=${encodeURIComponent(description)}`,
            formData,
            {
                headers: {
                    ...formData.getHeaders(),
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error issuing claim:', error.response?.data || error.message);
        throw error;
    }
};


const approveClaimItems = async (claimId, claimItemIdList) => {
    try {
        const payload = { claimItemIdList };

        const response = await trendyolClient.post(`/order/sellers/${sellerId}/claims/${claimId}/approve`, payload);

        return response.data;
    } catch (error) {
        console.error('Error approving claim items:', error.response?.data || error.message);
        throw error;
    }
};

const getClaims = async () => {
    try {
        const response = await trendyolClient.get(`/order/sellers/${sellerId}/claims`);
        return response.data;
    } catch (error) {
        console.error('Error fetching claims:', error.response?.data || error.message);
        throw error;
    }
};

module.exports = { issueClaim, getClaims, approveClaimItems };

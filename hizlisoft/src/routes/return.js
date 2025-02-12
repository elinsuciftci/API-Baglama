const express = require('express');
const fs = require('fs');
const FormData = require('form-data');
const { issueClaim, getClaims, approveClaimItems } = require('../services/trendyolService');

const router = express.Router();

// Talep oluşturma (Issue Claim)
router.post('/order/sellers/:sellerId/claims/:claimId/issue', async (req, res) => {
    try {
        const { claimIssueReasonId, claimItemIdList, description } = req.body;
        const filePath = req.file?.path; // Dosya multer vb. bir middleware ile yüklenmiş olmalı

        if (!claimIssueReasonId || !claimItemIdList || !description || !filePath) {
            return res.status(400).json({ error: 'Eksik parametreler: claimIssueReasonId, claimItemIdList, description ve dosya gereklidir.' });
        }

        const trendyolResponse = await issueClaim(req.params.claimId, claimIssueReasonId, claimItemIdList, description, filePath);

        res.status(200).json(trendyolResponse);
    } catch (error) {
        console.error('Trendyol Issue Claim Error:', error.message);
        res.status(500).json({ error: 'Trendyol API Hatası', details: error.response?.data || error.message });
    }
});

// Talep listesi alma (Get Claims)
router.get('/order/sellers/:sellerId/claims', async (req, res) => {
    try {
        const trendyolResponse = await getClaims(req.params.sellerId);
        res.status(200).json(trendyolResponse);
    } catch (error) {
        console.error('Trendyol Get Claims Error:', error.message);
        res.status(500).json({ error: 'Trendyol API Hatası' });
    }
});

// Talep onaylama (Approve Claim Items)
router.post('/order/sellers/:sellerId/claims/:claimId/approve', async (req, res) => {
    try {
        const { claimItemIdList } = req.body;

        if (!claimItemIdList || !Array.isArray(claimItemIdList) || claimItemIdList.length === 0) {
            return res.status(400).json({ error: 'Eksik veya geçersiz parametre: claimItemIdList bir dizi olmalıdır ve en az bir öğe içermelidir.' });
        }

        const trendyolResponse = await approveClaimItems(req.params.claimId, claimItemIdList);

        res.status(200).json(trendyolResponse);
    } catch (error) {
        console.error('Trendyol Approve Claim Items Error:', error.message);
        res.status(500).json({ error: 'Trendyol API Hatası', details: error.response?.data || error.message });
    }
});

module.exports = router;

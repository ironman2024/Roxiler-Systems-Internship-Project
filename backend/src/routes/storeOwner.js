const express = require('express');
const { getDashboard, createStore } = require('../controllers/storeOwnerController');
const { storeValidation } = require('../utils/validators');
const { auth, storeOwnerAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/dashboard', auth, storeOwnerAuth, getDashboard);
router.post('/store', auth, storeOwnerAuth, storeValidation, createStore);

module.exports = router;
const express = require('express');
const { getContracts, createContract } = require('../controllers/contractController');
const validateToken = require('../middleware/auth');
const requireAdmin = require('../middleware/admin');

const router = express.Router();

// Rota para criar contrato
router.post('/', validateToken, requireAdmin, createContract);

// Rota para obter contratos
router.get('/:empresa/:inicio', validateToken, getContracts);

module.exports = router;

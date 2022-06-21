const express = require('express');
const router = express.Router();
const donativoController = require('../controllers/Donativo')


router.post('/generarDonativo', donativoController.postGenerarDonativo);
router.get('/obtenerDonativos', donativoController.getDonativos);
router.get('/obtenerDonativo', donativoController.getDonativo);
router.post('/factura',donativoController.postFactura);
router.post('/unFactura', donativoController.postUnFactura)

module.exports = router;
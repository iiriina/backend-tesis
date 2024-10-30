var express = require('express');
var router = express.Router();
var EnvioController = require('../../controllers/envios.controller');

// Ruta para verificar que llegaste a la API de envíos
router.get('/', function(req, res, next) {
    res.send('Llegaste a la ruta de api/envios');
});

// Ruta para obtener la información de un envío específico
router.get('/envio', EnvioController.getEnvioEspecifico); // No necesita validación ni autorización

// Exportar el router
module.exports = router;

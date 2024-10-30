var express = require('express');
var router = express.Router();
var TributosComputadorasController = require('../../controllers/tributosComputadoras.controller');

// Ruta para verificar que llegaste a la API
router.get('/', function(req, res, next) {
    res.send('Llegaste a la ruta de api/tributosComputadoras.routes');
});

// Ruta para obtener los datos de tributos computadoras
router.get('/tributosComputadoras', TributosComputadorasController.getTributosComputadoras); // Asegúrate de que sea getTributosComputadoras

// Exportar el router
module.exports = router;

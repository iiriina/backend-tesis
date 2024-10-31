var express = require('express');
var router = express.Router();
var ComputersComtradeController = require('../../controllers/computers-comtrade.controller');

// Ruta para verificar la conexión a la API de Computers-Comtrade
router.get('/', function(req, res, next) {
    res.send('Llegaste a la ruta de api/computers-comtrade.routes');
});

// Ruta para obtener todos los registros de Computers-Comtrade
router.get('/computers-comtrade', ComputersComtradeController.getComputersComtrade);

// Exportar el router
module.exports = router;

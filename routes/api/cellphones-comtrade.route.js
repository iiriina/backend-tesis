var express = require('express');
var router = express.Router();
var CellphonesComtradeController = require('../../controllers/cellphones-comtrade.controller');

// Ruta para verificar la conexión a la API de Cellphones-Comtrade
router.get('/', function(req, res, next) {
    res.send('Llegaste a la ruta de api/cellphones-comtrade.routes');
});

// Ruta para obtener todos los registros de Cellphones-Comtrade
router.get('/cellphones-comtrade', CellphonesComtradeController.getCellphonesComtrade);

// Exportar el router
module.exports = router;

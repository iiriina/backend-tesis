var express = require('express');
var router = express.Router();
var DolarController = require('../../controllers/dolar.controller');

// Ruta para verificar que llegaste a la API
router.get('/', function(req, res, next) {
    res.send('Llegaste a la ruta de api/dolar.routes');
});

// Ruta para obtener el valor del dólar
router.get('/precio', DolarController.getDolar); // No necesita validación ni autorización

// Exportar el router
module.exports = router;

var express = require('express');
var router = express.Router();
var PuertaAPuertaController = require('../../controllers/impuestosPuertaAPuerta.controller');

// Ruta para verificar que llegaste a la API
router.get('/', function(req, res, next) {
    res.send('Llegaste a la ruta de api/impuestosPuertaAPuerta.routes');
});

// Ruta para obtener los datos de puerta a puerta
router.get('/puertaAPuerta', PuertaAPuertaController.getPuertaAPuerta); // Asegúrate que sea getPuertaAPuerta

// Exportar el router
module.exports = router;

var express = require('express');
var router = express.Router();
var TributosCelularesController = require('../../controllers/tributosCelulares.controller');

// Ruta para verificar que llegaste a la API
router.get('/', function(req, res, next) {
    res.send('Llegaste a la ruta de api/tributosCelulares.routes');
});

// Ruta para obtener los datos de tributos celulares
router.get('/tributosCelulares', TributosCelularesController.getTributosCelulares); // Asegúrate que sea getTributosCelulares

// Exportar el router
module.exports = router;

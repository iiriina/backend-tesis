/**ROUTE USER APIs. */
var express = require('express')

var router = express.Router()
var users = require('./api/user.route')

var computer_recommendations = require('./api/computer-prediction.route')
var prediction = require('./api/prediction.route')
var cellphone_recommendations = require('./api/cellphone_recommendations.route')

var dolar = require('./api/dolar.route');
var impuestosPuertaAPuerta = require('./api/impuestosPuertaAPuerta.route');
var envios = require('./api/envios.route'); // Agregar la ruta para envíos
var tributosCelulares = require('./api/tributosCelulares.route'); // Agregar la ruta para tributos celulares
var tributosComputadoras = require('./api/tributosComputadoras.route'); // Agregar la ruta para tributos computadoras

router.use('/users', users);


//nuevo tesis
router.use('/computer-prediction', computer_recommendations);
router.use('/prediction', prediction);
router.use('/cellphone_recommendations', cellphone_recommendations);
router.use('/dolar', dolar);
router.use('/puertaAPuerta', impuestosPuertaAPuerta);
router.use('/envios', envios);
router.use('/tributosCelulares', tributosCelulares); 
router.use('/tributosComputadoras', tributosComputadoras); 


module.exports = router;

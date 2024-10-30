var express = require('express')
var router = express.Router()
var ComputerController = require('../../controllers/computer-prediction.controller');

router.get('/', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/computer-prediction.routes');
});
router.get('/computer-prediction', ComputerController.getComputers) //muestra todos los productos que cumple con filtros

// Ruta para obtener una computadora por su ID
router.get('/computerPorId', ComputerController.getComputerById);


// Export the Router
module.exports = router;



var express = require('express')
var router = express.Router()
var PredictionController = require('../../controllers/prediction.controller');

router.get('/', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/prediction.routes');
});
router.get('/prediction', PredictionController.getPrediction) //muestra todos los productos que cumple con filtros

module.exports = router;

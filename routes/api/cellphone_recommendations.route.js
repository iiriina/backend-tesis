var express = require('express')
var router = express.Router()
var CellphoneController = require('../../controllers/cellphone-recommendations.controller');
// var Authorization = require('../../auth/authorization');
// Importar todos los middleware de validaciónvalidateEmail
// const validationMiddleware = require('../../middleware/validationServicio');
// Configura multer para guardar los archivos en la memoria
//const multer = require('multer');
//const storage = multer.memoryStorage();
//const upload = multer({ storage: storage });


// Authorize each API with middleware and map to the Controller Functions
/* GET servicios listing. */
router.get('/', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/cellphone-recommendations.routes');
});
router.get('/cellphone-recommendations', CellphoneController.getCellphones) //muestra todos los productos que cumple con filtros

// Ruta para obtener un celular por su ID
router.get('/cellphonePorId', CellphoneController.getCellphoneById);

//router.put('/modificarServicio',Authorization, upload.single('imagen'), ServicioController.modificarServicio)
//router.put('/agregarComentario',Authorization, ServicioController.agregarComentario)



// Export the Router
module.exports = router;



var express = require('express')
var router = express.Router()
var UserController = require('../../controllers/users.controller');
var Authorization = require('../../auth/authorization');

// Importar todos los middleware de validaciónvalidateEmail
const validationMiddleware = require('../../middleware/validationUser');


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/user.routes');
  });
router.post('/registration', validationMiddleware.validateCreateUser, UserController.crearUsuario) //validado
router.post('/login/',validationMiddleware.validateLoginUser, UserController.loginUsuario) //validado
router.post('/userByMail', UserController.getUsersByMail)

// Export the Router
module.exports = router;



var UserService = require('../services/user.service');


// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getUsers = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Users = await UserService.getUsers({}, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Users, message: "Succesfully Users Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}
exports.getUsersByMail = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    let filtro= {email: req.body.email}
    console.log(filtro)
    try {
        var Users = await UserService.getUsers(filtro, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Users, message: "Succesfully Users Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}
exports.updateUser = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body.name) {
        return res.status(400).json({status: 400., message: "Name be present"})
    }

    var User = {
       
        name: req.body.name ? req.body.name : null,
        email: req.body.email ? req.body.email : null,
        password: req.body.password ? req.body.password : null
    }

    try {
        var updatedUser = await UserService.updateUser(User)
        return res.status(200).json({status: 200, data: updatedUser, message: "Succesfully Updated User"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeUser = async function (req, res, next) {

    var id = req.body.id;
    try {
        var deleted = await UserService.deleteUser(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}


exports.crearUsuario = async function (req, res, next) {
    // Req.Body contiene los valores enviados desde el formulario
    console.log("Llegué al controller", req.body);

    // Crear el objeto usuario basado en los valores del request body
    var User = {
        nombre: req.body.nombre,
        email: req.body.email,
        contrasenia: req.body.contrasenia,
        tipoConsumidor: req.body.tipoConsumidor, // Incluir el campo tipoConsumidor
    };

    try {
        // Llamar a la función del servicio con el nuevo objeto del cuerpo de la solicitud
        var createdUser = await UserService.crearUsuario(User);

        // Remover la contraseña del objeto antes de enviarlo al frontend
        const { contrasenia, ...userWithoutPassword } = createdUser;
                
        // Devolver una respuesta de éxito con el usuario creado (sin la contraseña)
        return res.status(201).json({
            createdUser: userWithoutPassword, 
            message: "Usuario creado exitosamente"
        });
    } catch (error) {
        // Manejar el caso específico de correo electrónico en uso
        if (error.message === 'Correo electrónico ya está en uso') {
            return res.status(402).json({ status: 402, message: "El correo electrónico ya está en uso" });
        } else {
            // Manejar cualquier otro error
            console.error(error);
            return res.status(400).json({ status: 400, message: "Error al crear el usuario" });
        }
    }
};


exports.loginUsuario = async function (req, res, next) {
    // Req.Body contiene los valores enviados desde el formulario
    console.log("body", req.body);

    var User = {
        email: req.body.email,
        contrasenia: req.body.contrasenia
    };

    try {
        // Llamar a la función del servicio con el nuevo objeto del cuerpo de la solicitud
        var loginUser = await UserService.loginUsuario(User);

        if (loginUser === 0) {
            return res.status(400).json({ message: "Error en la contraseña" });
        } else {
            // Extraer solo los datos del usuario sin los metadatos de Mongoose
            const { contrasenia, ...userWithoutPassword } = loginUser.user._doc;

            // Devolver el usuario sin la contraseña
            return res.status(201).json({
                loginUser: {
                    token: loginUser.token,
                    user: userWithoutPassword
                },
                message: "Login exitoso"
            });
        }
    } catch (e) {
        // Devolver un mensaje de error con el código y el mensaje de error
        return res.status(400).json({ status: 400, message: "Usuario o contraseña inválidos" });
    }
};


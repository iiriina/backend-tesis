/* var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
const Comentario = require('./Comentario.model');
const Contratacion = require('./Contratacion.model');


var UserSchema = new mongoose.Schema({
    nombre: String,
    email: String,
    contrasenia: String,
    telefono: Number,
    titulo: String,
    experiencia: String,
    servicios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Servicio' }],
    comentariosPendientes: [Comentario.schema],
    contrataciones: [Contratacion.schema]
})

UserSchema.plugin(mongoosePaginate)
const User = mongoose.model('usuarios', UserSchema)

module.exports = User;

*/

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var UserSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contrasenia: { type: String, required: true },
    tipoConsumidor: { type: String, required: true }, // Campo agregado para tipoConsumidor
});

// Aplicar el plugin de paginación de mongoose
UserSchema.plugin(mongoosePaginate);

const User = mongoose.model('usuarios', UserSchema);

module.exports = User;

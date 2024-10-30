var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

// Esquema para el dispositivo (teléfono o computadora)
var ComputadoraSchema  = new mongoose.Schema({
    nombre: String, // Ejemplo: "MacBook Air", "ThinkPad P16s Gen 2"
    descripcion: [String], // Descripción extensa (como en el Lenovo ejemplo)
    procesador: String, // Ejemplo: "Apple M2 chip" o "Intel Core i7"
    OS: String, // Ejemplo: "MacOS", "Windows"
    placaGrafica: String, // Ejemplo: "Gráficos Intel", "GPU NVIDIA"
    RAM: String, // Ejemplo: "16 GB"
    almacenamiento: String, // Ejemplo: "1 TB SSD" o "512 GB"
    precio: Number, // Precio en moneda base
    precioArg: Number, // Precio en pesos argentinos
    tamanio: String, // Tamaño en pulgadas, por ejemplo: "13-inch"
    display: String, // Información sobre la pantalla, por ejemplo: "WUXGA de 16 pulgadas"
    imagenes: [String], // Lista de URLs de imágenes
    marca: String, // Marca como "HP", "Lenovo", "Apple"
    modelo: String, // Ejemplo: "8-Core CPU", o vacío si no es relevante
    resolucionPantalla: String, // Ejemplo: "1920x1200"
    sistema_operativo: String, // Sistema operativo específico
    bateria: String, // Información de la duración de la batería
    peso: String, // Peso en gramos, por ejemplo: "189g"
});

// Añadir paginación al esquema
ComputadoraSchema.plugin(mongoosePaginate);
const Computadora = mongoose.model('computadoras', ComputadoraSchema, 'computadorasNuevas');

module.exports = Computadora;
const AWS = require('aws-sdk');
const Cellphone = require('../models/Celular.model');
require('dotenv').config();

// Configurar credenciales de AWS manualmente
const lambda = new AWS.Lambda({
    region: 'us-east-1',  
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,      
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,  
    sessionToken: process.env.AWS_SESSION_TOKEN  
});

// Obtener celulares con paginación
exports.getCellphones = async function(query) {
    try {
        const page = parseInt(query.page, 10) || 1;  // Página actual, por defecto es 1
        const limit = parseInt(query.limit, 10) || 20;  // Límites de resultados por página, por defecto es 20
        const skip = (page - 1) * limit;

        // Construir los parámetros en el formato que espera la Lambda (queryStringParameters)
        const transformedQuery = {
            query: query.query || '',
            min_price: query.min_price || null,
            max_price: query.max_price || null,
            almacenamiento: query.almacenamiento || null,  // Añadir filtro de almacenamiento
            cantidadCamaras: query.cantidadCamaras || null,  // Añadir filtro de cantidad de cámaras
            limit: limit,  // Añadir el límite
            page: page     // Añadir la página
        };
        
        console.log("transformedQuery:", transformedQuery);

        const params = {
            FunctionName: 'Lambda-cellphones', // Reemplaza con el nombre de tu Lambda de celulares
            Payload: JSON.stringify({ queryStringParameters: transformedQuery })
        };

        const response = await lambda.invoke(params).promise();

        let responseBody = JSON.parse(response.Payload);

        // Si el cuerpo de la respuesta contiene un 'body' que es una cadena JSON, deserialízalo
        if (responseBody && responseBody.body) {
            const preprocessedBody = responseBody.body.replace(/NaN/g, "null");
            responseBody = JSON.parse(preprocessedBody);
        }
        console.log("responseBody received:", responseBody);

        // Verificar si "recommendations" está definido y es un array
        const cellphonesData = Array.isArray(responseBody.recommendations) ? responseBody.recommendations : [];

        // Convertir los datos a instancias del modelo Cellphone
        const cellphones = cellphonesData.map(item => new Cellphone(item));

        return {
            data: cellphones.slice(skip, skip + limit),  // Aplicar paginación
            currentPage: page,
            totalPages: Math.ceil(cellphones.length / limit),
            totalItems: cellphones.length
        };
    } catch (e) {
        console.error("Error in getCellphones", e.message);
        throw new Error('Error while retrieving cellphones');
    }
};

// Función para obtener un celular por ID
exports.getCellphoneById = async function (id_celular) {
    try {
        // Buscar el celular por su ID en la base de datos
        const celular = await Cellphone.findById(id_celular);

        // Verificar si el celular fue encontrado
        if (!celular) {
            throw Error("Celular no encontrado");
        }

        // Devuelve el celular encontrado
        return celular;
    } catch (e) {
        console.error("Error al recuperar el celular", e.message);
        throw Error('Error al recuperar el celular por ID');
    }
};

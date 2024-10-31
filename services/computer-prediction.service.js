const AWS = require('aws-sdk');
const Computadora = require('../models/Computadora.model');
require('dotenv').config();

// Configurar credenciales de AWS manualmente
const lambda = new AWS.Lambda({
    region: 'us-east-1',  
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,      
    secretAccessKey:  process.env.AWS_SECRET_ACCESS_KEY,  
    sessionToken: process.env.AWS_SESSION_TOKEN  
});
 
// Obtener computadoras con paginación
exports.getComputers = async function(query) {
    try {
        const page = parseInt(query.page, 10) || 1;
        const limit = parseInt(query.limit, 10) || 20;
        const skip = (page - 1) * limit;

        const transformedQuery = {
            query: query.query || '',
            min_price: query.min_price || null,
            max_price: query.max_price || null,
            almacenamiento: query.almacenamiento || null,
            RAM: query.RAM || null,
            limit: limit,
            page: page
        };

        console.log("transformedQuery:", transformedQuery);

        const params = {
            FunctionName: 'Lambda-computers', // Reemplaza con el nombre de tu Lambda
            Payload: JSON.stringify({ queryStringParameters: transformedQuery })
        };

        const response = await lambda.invoke(params).promise();

        let responseBody = JSON.parse(response.Payload);

        if (responseBody && responseBody.body) {
            const preprocessedBody = responseBody.body.replace(/NaN/g, "null");
            responseBody = JSON.parse(preprocessedBody);
        }
        console.log("responseBody received:", responseBody);

        const computadorasData = Array.isArray(responseBody.recommendations) ? responseBody.recommendations : [];
        const computadoras = computadorasData.map(item => new Computadora(item));

        return {
            data: computadoras.slice(skip, skip + limit),
            currentPage: page,
            totalPages: Math.ceil(computadoras.length / limit),
            totalItems: computadoras.length
        };
    } catch (e) {
        console.error("Error in getComputers", e.message);
        throw new Error('Error while retrieving computers');
    }
};

// Función para obtener una computadora por ID
exports.getComputerById = async function (id_computer) {
    try {
        const computer = await Computadora.findById(id_computer);

        if (!computer) {
            throw Error("Computadora no encontrada");
        }

        return computer;
    } catch (e) {
        console.error("Error al recuperar la computadora", e.message);
        throw Error('Error al recuperar la computadora por ID');
    }
};

const axios = require('axios');
const Cellphone = require('../models/Celular.model');  // Assuming you have a Cellphone model similar to the Computadora model

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
        
        console.log(transformedQuery);
        
        // Filtrar los parámetros que tienen valores vacíos o nulos
        const filteredQuery = Object.fromEntries(
            Object.entries(transformedQuery).filter(([key, value]) => value !== null)
        );

        console.log("Filtered Query:", filteredQuery);

        // URL de la API Gateway para celulares
        const url = 'https://7xa8zhphp9.execute-api.us-east-1.amazonaws.com/dev/cellphone-recommendations';
        const queryString = new URLSearchParams(filteredQuery).toString();
        const requestUrl = `${url}?${queryString}`;
        console.log("Request URL:", requestUrl);

        // Realizar la solicitud GET a la API Gateway con la URL generada
        const response = await axios.get(requestUrl);

        // Verificar la estructura de la respuesta
        let responseBody = response.data;

        // Si el cuerpo de la respuesta contiene un 'body' que es una cadena JSON, deserialízalo
        if (responseBody && responseBody.body) {
            try {
                // Preprocesa el JSON para reemplazar "NaN" con null
                const preprocessedBody = responseBody.body.replace(/NaN/g, "null");
                responseBody = JSON.parse(preprocessedBody);
            } catch (e) {
                console.error("Failed to parse JSON response body", e.message);
                throw new Error("Failed to parse JSON response body");
            }
        }

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
        // Manejo de errores
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
        // Lanza un error en caso de que algo falle
        console.error("Error al recuperar el celular", e.message);
        throw Error('Error al recuperar el celular por ID');
    }
};


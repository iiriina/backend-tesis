const AWS = require('aws-sdk');
require('dotenv').config();

// Configurar credenciales de AWS manualmente
const lambda = new AWS.Lambda({
    region: 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN
});

exports.getPrediction = async function() {
    try {
        console.log("Fetching all historical and future prediction data");

        // Configuración para invocar la Lambda de predicciones
        const params = {
            FunctionName: 'Lambda-predictions', // Reemplaza con el nombre de tu Lambda de predicciones
            Payload: JSON.stringify({ queryStringParameters: {} }) // Enviar sin parámetros de consulta
        };

        // Invocar la Lambda
        const response = await lambda.invoke(params).promise();

        let responseBody = JSON.parse(response.Payload);

        // Verificar la estructura de la respuesta
        if (responseBody && responseBody.body) {
            try {
                // Preprocesar el JSON para reemplazar "NaN" con null si es necesario
                const preprocessedBody = responseBody.body.replace(/NaN/g, "null");
                responseBody = JSON.parse(preprocessedBody);
            } catch (e) {
                console.error("Failed to parse JSON response body", e.message);
                throw new Error("Failed to parse JSON response body");
            }
        }

        // Verificar si "historical_values" y "future_predictions" están definidos
        const historicalValues = responseBody.historical_values || [];
        const historicalDates = responseBody.historical_dates || [];
        const futurePredictions = responseBody.future_predictions || [];
        const futureDates = responseBody.future_dates || [];

        // Registrar los datos para verificación
        console.log("Historical Values:", historicalValues);
        console.log("Historical Dates:", historicalDates);
        console.log("Future Predictions:", futurePredictions);
        console.log("Future Dates:", futureDates);

        // Devolver los datos en el formato esperado
        return {
            historicalValues,
            historicalDates,
            futurePredictions,
            futureDates,
        };
    } catch (e) {
        console.error("Error in getPrediction", e.message);
        throw new Error('Error while retrieving prediction data');
    }
};

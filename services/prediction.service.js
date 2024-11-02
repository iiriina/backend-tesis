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

        // Configurar los parámetros para invocar la Lambda
        const params = {
            FunctionName: 'lambda-predictivo',  // Nombre de la Lambda que quieres invocar
            Payload: JSON.stringify({})  // Puedes pasar parámetros en el payload si tu Lambda los espera
        };

        // Invocar la función Lambda
        const response = await lambda.invoke(params).promise();

        // Procesar la respuesta de la Lambda
        let responseBody = JSON.parse(response.Payload);
        console.log('responseBody received:', responseBody);

        // Si el cuerpo de la respuesta contiene un 'body' que es una cadena JSON, deserialízalo
        if (responseBody && responseBody.body) {
            try {
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

        // Aquí puedes procesar los datos históricos y de predicciones futuros
        console.log("Historical Values:", historicalValues);
        console.log("Historical Dates:", historicalDates);
        console.log("Future Predictions:", futurePredictions);
        console.log("Future Dates:", futureDates);

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

const swaggerAutogen = require('swagger-autogen')();
const outputFile = './swagger/swagger.json';
const arrEndPoints = ['./index.js'];

swaggerAutogen(outputFile,arrEndPoints);
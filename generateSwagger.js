const swaggerJSDoc = require('swagger-jsdoc');
const fs = require('fs');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Simples com Express',
      version: '1.0.0',
      description: 'Documentação da API usando Swagger',
    },
    servers: [
      {
        url: 'https://min-express-belq2on9b-davidhenrique2106s-projects.vercel.app', // URL do deploy
      },
    ],
  },
  apis: ['./app.js'], // seu arquivo com comentários swagger
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Salva o JSON em um arquivo
fs.writeFileSync('./public/swagger.json', JSON.stringify(swaggerSpec, null, 2));
console.log('Arquivo swagger.json gerado em /public');

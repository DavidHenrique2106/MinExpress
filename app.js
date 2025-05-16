const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const app = express();
const PORT = 8000;

app.use(express.json());

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
        url: 'http://localhost:8000',
      },
    ],
  },
  apis: ['./app.js'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Mensagem de boas-vindas
 *     responses:
 *       200:
 *         description: Retorna uma mensagem de boas-vindas
 */
app.get('/', (req, res) => {
  res.send('👋 Bem-vindo ao servidor Express!');
});

/**
 * @swagger
 * /hora:
 *   get:
 *     summary: Retorna a hora atual
 *     responses:
 *       200:
 *         description: Hora atual formatada
 */
app.get('/hora', (req, res) => {
  const agora = new Date();
  const horaFormatada = agora.toLocaleTimeString('pt-BR');
  res.send(`🕒 Agora são ${horaFormatada}`);
});

/**
 * @swagger
 * /nome:
 *   post:
 *     summary: Saúda o usuário pelo nome (enviado via JSON)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: David
 *     responses:
 *       200:
 *         description: Retorna uma saudação personalizada
 */
app.post('/nome', (req, res) => {
  const { nome } = req.body;
  if (nome) {
    res.send(`Olá, ${nome}! 👋 Seja bem-vindo!`);
  } else {
    res.status(400).send('⚠️ Por favor, envie um JSON com o campo "nome"');
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
  console.log(`📚 Documentação Swagger disponível em http://localhost:${PORT}/api-docs`);
});

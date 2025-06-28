// criando o servidor
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

// importar módulos de rota
const tarefasRoutes = require('./routes/tarefas');
require('./notificador');

const app = express();
const PORT = process.env.PORT || 3000;
// const API = process.env.API_REAL_URL;

// configurações
app.use(cors()); // habilita CORS
app.use(express.json()); // entende JSON

// rotas
app.use('/tarefas', tarefasRoutes); 


// servir arquivos estáticos se tiver frontend (- retirar no deploy)
// app.use(express.static(path.join(__dirname, '..', 'public')));

// iniciando o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando no render porta${ PORT}`);
});

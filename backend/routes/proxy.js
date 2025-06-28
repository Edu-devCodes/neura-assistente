// const express = require('express');
// const { createProxyMiddleware } = require('http-proxy-middleware');
// const path = require('path');

// // força o caminho absoluto do .env
// require('dotenv').config({
//   path: path.resolve(__dirname, '../../.env'),
// });

// console.log("🔧 URL da API REAL carregada:", process.env.API_REAL_URL);


// const router = express.Router();
// const API_REAL = process.env.API_REAL_URL;

// if (!API_REAL) {
//   throw new Error('[CONFIG] Variável API_REAL_URL não definida. Verifique o arquivo .env na raiz.');
// }

// router.use('/', createProxyMiddleware({
//   target: API_REAL,
//   changeOrigin: true,
//   pathRewrite: {
//     '^/api': '',
//   },
//   onProxyReq: (proxyReq, req) => {
//     console.log(`[PROXY] ${req.method} ${req.originalUrl} -> ${API_REAL}`);
//   }
// }));

// module.exports = router; # cancelado por bugs por estar no mesmo dominio do servidor princiap bug de loop

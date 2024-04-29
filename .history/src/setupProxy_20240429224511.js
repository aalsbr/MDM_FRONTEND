// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api1',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
  app.use(
    '/api2',
    createProxyMiddleware({
      target: 'http://localhost:8081',
      changeOrigin: true,
    })
  );
  // Add more proxies as needed
};
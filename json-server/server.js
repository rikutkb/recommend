const path = require('path');
const fs = require('fs-extra');
const jsonServer = require('json-server');
 
// Expressをインスタンス化する
const app = jsonServer.create();
 
const middlewares = jsonServer.defaults();
app.use(middlewares);
 


const resourceCollector = require('./resource-collector.js');
resourceCollector(
  'api',
  (vPath, routeJson) => app.use(vPath, jsonServer.router(routeJson))
);
app.listen(8080, () => {
    console.log('JSON Server is running');
  });
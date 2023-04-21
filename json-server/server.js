const path = require('path');
const fs = require('fs-extra');
const jsonServer = require('json-server');
 
// Expressをインスタンス化する
const app = jsonServer.create();
 
const middlewares = jsonServer.defaults();
app.use(middlewares);
app.use(jsonServer.rewriter({
    "/api/playlists/:id": "/api/playlists/:id",
    "/api/playlists": "/api/play-lists"
}))


const resourceCollector = require('./resource-collector.js');
resourceCollector(
  'api',
  (vPath, routeJson) => app.use(vPath, jsonServer.router(routeJson))
);
app.listen(8080, '0.0.0.0', () => {
    console.log('JSON Server is running');
});
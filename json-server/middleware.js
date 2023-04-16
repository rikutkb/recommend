const jsonServer = require('json-server');

const app = jsonServer.create();
const middleware = jsonServer.defaults();

app.use(middleware);
const router = jsonServer.router('merge.json');
app.use(router);
app.listen(8080,()=>{
    console.log("json-server is running");
});

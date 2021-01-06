const express = require("express");
const app = express();

app.use(express.json());
// setting for local server connection from other port
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    next();
});
app.set('env', 'production');


module.exports = app

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./configuration/swagger')

// use swagger-Ui-express for your app documentation endpoint
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const server = require("http").createServer(app);

const port = 3050
server.listen(port, () => console.log(`listening on port ${port}`));

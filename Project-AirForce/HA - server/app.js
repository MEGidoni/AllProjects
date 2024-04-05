const express = require('express');
const path = require('path');
const http = require('http');
const cors = require('cors');
require('./db/mongoConnect');
const { routesInit } = require('./routs/configRouts');
const app = express();
app.use(cors(
  {
    origin:true,
    credentials:true
  }
  ));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
routesInit(app);
const server = http.createServer(app);
server.listen("https://ha-server.onrender.com/");

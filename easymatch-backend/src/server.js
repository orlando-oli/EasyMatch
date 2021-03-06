
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');
const http = require('http');

const mongoUrl = 'MONGO_URL';
const app = express();
const server = new http.Server(app);

mongoose.connect(mongoUrl, {useNewUrlParser: true});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3000);

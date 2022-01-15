const express = require('express');
const con = require('../database');
const app = express();
const PORT = 3000;

app.use('/', express.static(__dirname + '/../../Front/dist'));

app.use(express.json());

//get product data
app.get
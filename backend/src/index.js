const express = require('express');
const cors = require('cors')
const routes = require('./routes');

const app = express()
app.use(cors()) // origen : endeço que o front pode acessar - por enquanto todos
app.use(express.json());
app.use(routes)

app.listen(3333)
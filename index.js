require('dotenv').config();
require('./database');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(require('./csvRoutes'))
app.use(require('./auth'));



app.listen(process.env.PORT, () => { console.log('Server is listening') });
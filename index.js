require('dotenv').config();
require('./database');
const express = require('express');
const app = express();

const register = require('./models/register');

const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(require('./auth'));

const { parse } = require('csv-parse');
const fileUploader = require('express-fileupload');
const fs = require('fs');

app.use(fileUploader({
    useTempFiles: true,
    tempFilePath: "/tmp/"
}));

app.post('/upload', async (req, res) => {
    let myFile = req.files.myCsvFile;
    myFile = fs.readFileSync(myFile.tempFilePath, 'utf-8');
    parse(myFile, { columns: true }, (err, records) => {
        if (err)
            console.log(err);
        console.log(records);
    });
    return res.status(201).send(records);
});

app.listen(process.env.PORT, () => { console.log('Server is listening') });
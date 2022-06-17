require('dotenv').config();
require('./database');
const express = require('express');
const app = express();

const { parse } = require('csv-parse');
const fileUploader = require('express-fileupload');
const fs = require('fs');

app.use(express.json());
app.use(fileUploader({
    useTempFiles: true,
    tempFilePath: "/tmp/"
}));

app.post('/upload', async(req, res) => {
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